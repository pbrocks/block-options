
/**
 * Internal dependencies
 */
import DevicesOptions from '../../../advanced-controls/options/devices/';
import UserStateOptions from '../../../advanced-controls/options/state/';
import LogicOptions from '../../../advanced-controls/options/logic/';
import ACFOptions from '../../../advanced-controls/options/acf/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { Fragment, Component } = wp.element;
const { Modal, TabPanel, withSpokenMessages } = wp.components;
const { PluginBlockSettingsMenuItem } = wp.editPost;
const { compose } = wp.compose;

const restrictedBlocks = [ 'core/freeform', 'core/shortcode', 'core/block', 'core/template', 'sidetrack/import' ];

/**
 * Render plugin
 */
class BlockSettings extends Component {
	constructor() {
		super( ...arguments );

		this.reloadModal = this.reloadModal.bind( this );

		this.state = {
			settings: '',
			isOpen: false,
			reload: false,
		};
	}

	reloadModal() {
		this.setState( { reload: ! this.state.reload } );
	}

	render() {
		const {
			isDisabledDevices,
			isDisabledUserState,
			isDisabledLogic,
			isDisabledACF,
		} = this.props;

		let selectedBlock = this.props.selectedBlock;
		selectedBlock = Object.assign( { reloadModal: this.reloadModal }, selectedBlock );

		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const tabs = [];

		if ( ! isDisabledDevices || ! isDisabledUserState ) {
			tabs.push( {
				name: 'default',
				title: __( 'Default', 'blockshop-options' ),
				className: 'sidetrack-default',
			} );
		}

		if ( ! isDisabledLogic || ! isDisabledACF ) {
			tabs.push( {
				name: 'advanced',
				title: __( 'Advanced', 'blockshop-options' ),
				className: 'sidetrack-advanced',
			} );
		}

		//if all options are disabled return nothing
		if ( isDisabledDevices && isDisabledUserState && isDisabledLogic && isDisabledACF ) {
			return null;
		}

		//return nothing if restricted
		if ( typeof selectedBlock.name !== 'undefined' && restrictedBlocks.includes( selectedBlock.name ) ) {
			return null;
		}

		return (
			<Fragment>
				<PluginBlockSettingsMenuItem
					icon="visibility"
					label={ __( 'Visibility Settings', 'blockshop-options' ) }
					onClick={ () => {
						this.setState( { isOpen: true } );
					} }
				>

				</PluginBlockSettingsMenuItem>
				{ this.state.isOpen && typeof selectedBlock.name !== 'undefined' && ! restrictedBlocks.includes( selectedBlock.name ) ?
					<Modal
						title={ __( 'Visibility Settings', 'blockshop-options' ) }
						onRequestClose={ () => closeModal() }
						closeLabel={ __( 'Close', 'blockshop-options' ) }
						className="sidetrack-components-modal__content"
					>
						<TabPanel className="sidetrack-tab-panel"
							activeClass="is-active"
							tabs={ tabs }>
							{
								( tab ) => {
									switch ( tab.name ) {
										case 'advanced':
											return [
												! isDisabledLogic && LogicOptions( selectedBlock ),
												! isDisabledACF && <ACFOptions selectedBlock={ selectedBlock } />,
											];
										default:
											return [
												<small>{ __( 'Attention: The display settings (show/hide for mobile, tablet, desktop or users) will only take effect once you are on the live page, and not while you\'re editing in Gutenberg.', 'blockshop-options' ) }</small>, /* eslint-disable-line react/jsx-key */
												! isDisabledDevices && DevicesOptions( selectedBlock ),
												! isDisabledUserState && UserStateOptions( selectedBlock ),
											];
									}
								}
							}
						</TabPanel>
					</Modal> :
					null }

			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select ) => {
		const selectedBlock = select( 'core/block-editor' ).getSelectedBlock();

		if ( ! selectedBlock ) {
			return {};
		}

		return {
			selectedBlock,
			isDisabledDevices: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackDevicesVisibility' ),
			isDisabledUserState: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackUserStateVisibility' ),
			isDisabledLogic: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackLogicVisibility' ),
			isDisabledACF: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackAcfVisibility' ),
		};
	} ),
	withSpokenMessages,
)( BlockSettings );
