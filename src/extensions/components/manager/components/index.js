/**
 * Internal dependencies
 */
import FeaturesManager from './manager';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Fragment, Component } = wp.element;
const { PluginMoreMenuItem } = wp.editPost;
const { withSpokenMessages, Modal } = wp.components;

/**
 * Render plugin
 */
class FeaturesManagerModal extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			isOpen: false,
		};
	}

	render() {
		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		return (
			<Fragment>
				<PluginMoreMenuItem
					icon={ null }
					role="menuitemcheckbox"
					onClick={ () => {
						this.setState( { isOpen: true } );
					} }
				>
					{ __( 'Sidetrack Settings', 'blockshop-options' ) }
				</PluginMoreMenuItem>
				{ this.state.isOpen ?
					<Modal
						title={ __( 'Sidetrack Features Manager', 'blockshop-options' ) }
						onRequestClose={ () => closeModal() }
						closeLabel={ __( 'Close', 'blockshop-options' ) }
						icon={ null }
						className="sidetrack-modal-component components-modal--sidetrack-features-manager"
					>
						{ <FeaturesManager /> }
					</Modal> :
					null }
			</Fragment>
		);
	}
}

export default compose( [
	withSpokenMessages,
] )( FeaturesManagerModal );
