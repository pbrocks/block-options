/**
 * Internal dependencies
 */
import ShareABlockLoading from "./loading";
import DownloadsModal from "./downloads";
import Inspector from './inspector';
;
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { select, dispatch } = wp.data;
const { withInstanceId } = wp.compose;
const { Fragment, Component } = wp.element;
const { parse, createBlock } = wp.blocks;
const { MediaUploadCheck } = wp.blockEditor;
const { DropZone, FormFileUpload, Placeholder, Modal, TextControl, Button } = wp.components;

/**
 * Get settings.
 */
let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

const apiPath = 'https://shareablock.com/edd-api/my-files';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			apiKey: "",
			accessToken: "",
			hasValidApiKey: false,
			isSaving: false,
			keySaved: false,
			isSavedKey: false,
			isLoading: false,
			isInserting: 0,
			downloads: {},
			filtered: {},
			isOpen: false,
			error: null
		};

		settings.on( 'change:shareablock_api_key', ( model ) => {
			const apiSettings = JSON.parse( model.get( 'shareablock_api_key' ) );
			this.setState( {
				apiKey: apiSettings.apiKey,
				accessToken: apiSettings.accessToken,
				hasValidApiKey: apiSettings.hasValidApiKey,
				isSavedKey: apiSettings.apiKey !== '',
			} );
		} );

		settings.fetch().then( ( response ) => {
			if ( typeof response.shareablock_api_key !== 'undefined' && response.shareablock_api_key ) {
				const apiSettings = JSON.parse( response.shareablock_api_key );
				this.setState({ apiKey: apiSettings.apiKey, accessToken: apiSettings.accessToken, hasValidApiKey: apiSettings.hasValidApiKey,isSavedKey: true } );
			}
		} );

		this.saveApiKey = this.saveApiKey.bind( this );
		this.updateApiKey = this.updateApiKey.bind( this );
		this.fetchDownloads = this.fetchDownloads.bind( this );
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	updateApiKey( apiKey = this.state.apiKey, accessToken = this.state.accessToken ) {
		const { setAttributes } = this.props;
		apiKey = apiKey.trim();
		accessToken = accessToken.trim();

		this.fetchDownloads( apiKey, accessToken );

		if ( apiKey === '' ) {
			setAttributes( { hasApiKey: false } );
		}
	}

	saveApiKey(apiKey = this.state.apiKey, accessToken = this.state.accessToken, hasValidApiKey = this.state.hasValidApiKey ) {
		const { setAttributes } = this.props;

		this.setState( { apiKey, accessToken, isSaving: true } );

		const model = new wp.api.models.Settings( {
			shareablock_api_key: JSON.stringify({ apiKey, accessToken, hasValidApiKey } ),
		} );

		model.save().then( () => {
			this.setState( {
				isSaving: false,
				keySaved: true,
			} );
			settings.fetch();
			setAttributes( { hasApiKey: true } );
			this.onClose();
		} );
	}

	fetchDownloads(apiKey = this.state.apiKey, accessToken = this.state.accessToken, hasValidApiKey = this.state.hasValidApiKey ) {
		const { setAttributes } = this.props;

		this.setState( { isLoading: true } );
		const fetchApi = async () => {
			const response = await fetch(
				`${ apiPath }?key=${ apiKey }&token=${ accessToken }`
			);

			const data = await response.json();
			if (data){
				if ( typeof data.error !== "undefined") {
					this.setState({ error: data.error, isLoading: false });
				} else {
					this.setState({ downloads: data, isLoading: false });
					this.saveApiKey(apiKey, accessToken, true);
				}
			}
				
		};

		fetchApi();
	}

	filterDownloads(keyword){
		let filtered = {};

		if ('all' === keyword ){
			this.setState({ filtered: {} });

			return;
		}

		let updatedList = Object.entries(this.state.downloads.purchased_files).filter(function (item) {
			return item[1].category.toLowerCase().search(
				keyword.toLowerCase()) !== -1;
		});

		updatedList.forEach(([key]) => {
			filtered[key] = this.state.downloads.purchased_files[key];
		});
		this.setState({ filtered: { 'purchased_files': filtered } });
	}

	setIsInserting(key){
		this.setState({ isInserting: key });
	}

	onClose(){
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		const { attributes, isSelected } = this.props;
		const { error, apiKey, accessToken, isLoading, isInserting, isOpen, downloads, filtered, hasValidApiKey } = this.state;
		const { hasApiKey } = attributes;

		if (isLoading) {
			return <ShareABlockLoading />;
		}

		return (
			<Fragment>
				{isSelected && (
					<Inspector
						{...this.props}
						apiKey={apiKey}
						accessToken={accessToken}
						updateApiKeyCallBack={this.updateApiKey}
					/>
				)}
				<Placeholder
					icon="layout"
					label={ __( 'ShareABlock from EditorsKit', 'block-options' ) }
					instructions={ __(
						'Insert your downloads from shareablock.com at ease.',
						'block-options'
					) }
				>
					<Fragment>
						{ error || ( hasApiKey && ! hasValidApiKey ) ? (
							<div className="editorskit-inline-error notice-error notice">
								{ __( 'Invalid API or Access Token.', 'block-options' ) }
							</div>
						) : null }
						{isOpen && (<DownloadsModal clientId={this.props.clientId} onClose={() => { this.onClose() }} setIsInserting={(key) => { this.setIsInserting(key) }} isInserting={isInserting} downloads={Object.keys(filtered).length > 0 ? filtered : downloads} filterDownloads={(keyword) => { this.filterDownloads(keyword) } } /> ) }
						{ apiKey && accessToken && hasValidApiKey ? (
							<Fragment>
								<Button 
									isPrimary 
									isLarge 
									onClick={() => { 
										this.updateApiKey();
									} }>
									{ __( 'View Downloads', 'block-options' ) }
								</Button>
							</Fragment>
						) : (
							<Fragment>
								<TextControl
									value={ apiKey }
									label={ __( 'API Settings', 'block-options' ) }
									placeholder={ __( 'Enter Public API Key…', 'block-options' ) }
									onChange={ ( newKey ) => {
										this.setState( { apiKey: newKey } );
									} }
								/>
								<TextControl
									value={ accessToken }
									placeholder={ __( 'Enter Access Token…', 'block-options' ) }
									onChange={ ( newToken ) => {
										this.setState( { accessToken: newToken } );
									} }
								/>
								<Button
									isPrimary
									onClick={ () => {
										this.updateApiKey();
									} }
								>
									{ __( 'Apply & View Downloads', 'block-options' ) }
								</Button>
								<Button
									isTertiary
								>
									{ __( 'Get API Key', 'block-options' ) }
								</Button>
							</Fragment>
						) }
					</Fragment>
				</Placeholder>
			</Fragment>
		);
	}
}

export default withInstanceId( Edit );
