/**
 * Internal dependencies
 */
import importReusableBlock from '../utils/import';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { select, dispatch } = wp.data;
const { withInstanceId } = wp.compose;
const { Fragment, Component } = wp.element;
const { parse, createBlock } = wp.blocks;
const { MediaUploadCheck } = wp.blockEditor;
const { DropZone, FormFileUpload, Placeholder, Notice } = wp.components;

const ALLOWED_BG_MEDIA_TYPES = [ 'json' ];

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			isLoading: false,
			error: null,
		};

		this.isStillMounted = true;
		this.addFile = this.addFile.bind( this );
	}

	componentDidMount() {
		const { file } = this.props.attributes;

		if ( file ) {
			this.setState( { isLoading: true } );
			this.addFile( file );
		}
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	insertImportedBlocks( blocks ) {
		const { onClose } = this.props;
		blocks = parse( blocks );
		const toSelect = [];
		const blockIndex = select( 'core/block-editor' ).getBlockInsertionPoint();
		if ( blocks.length > 0 ) {
			for ( const block in blocks ) {
				const created = createBlock( blocks[ block ].name, blocks[ block ].attributes, blocks[ block ].innerBlocks );
				dispatch( 'core/block-editor' ).insertBlocks( created, parseInt( blockIndex.index ) + parseInt( block ) );

				if ( typeof created !== 'undefined' ) {
					toSelect.push( created.clientId );
				}
			}

			//remove insertion point if empty
			dispatch( 'core/block-editor' ).removeBlock( this.props.clientId );

			//select inserted blocks
			if ( toSelect.length > 0 ) {
				dispatch( 'core/block-editor' ).multiSelect( toSelect[ 0 ], toSelect.reverse()[ 0 ] );
			}
		}

		onClose();
	}

	addFile( files ) {
		let file = files[ 0 ];

		if ( files.target ) {
			file = event.target.files[ 0 ];
		}

		if ( ! file ) {
			return;
		}
		this.setState( { isLoading: true } );

		importReusableBlock( file )
			.then( ( reusableBlock ) => {
				if ( ! this.isStillMounted ) {
					return;
				}

				this.setState( { isLoading: false } );
				this.insertImportedBlocks( reusableBlock );
			} )
			.catch( ( error ) => {
				if ( ! this.isStillMounted ) {
					return;
				}

				let uiMessage;
				switch ( error.message ) {
					case 'Invalid JSON file':
						uiMessage = __( 'Invalid JSON file', 'blockshop-options' );
						break;
					case 'Invalid Reusable Block JSON file':
						uiMessage = __( 'Invalid Reusable Block JSON file', 'blockshop-options' );
						break;
					default:
						uiMessage = __( 'Unknown error', 'blockshop-options' );
				}

				this.setState( { isLoading: false, error: uiMessage } );
			} );
	}

	render() {
		const { isLoading, error } = this.state;

		return (
			<Placeholder
				icon="download"
				label={ __( 'Import from JSON', 'blockshop-options' ) }
				instructions={ __( 'Drag a file or upload a new one from your device.', 'blockshop-options' ) }
				className="editor-media-placeholder"
				notices={ error && (
					<Notice status="error">
						{ error }
					</Notice>
				) }
			>
				<Fragment>
					<MediaUploadCheck>
						<DropZone
							onFilesDrop={ this.addFile }
							label={ __( 'Import from JSON', 'blockshop-options' ) }
						/>
						<FormFileUpload
							isLarge
							className="editor-media-placeholder__button"
							onChange={ this.addFile }
							accept={ ALLOWED_BG_MEDIA_TYPES }
							isBusy={ isLoading }
							disabled={ isLoading }
							multiple={ false }
						>
							{ __( 'Upload', 'blockshop-options' ) }
						</FormFileUpload>
					</MediaUploadCheck>
				</Fragment>
			</Placeholder>
		);
	}
}

export default withInstanceId( Edit );
