/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Toolbar, withSpokenMessages, Button } = wp.components;

class ToolbarControls extends Component {
	render() {
		const {
			onConvertToStatic,
			isDisabled,
		} = this.props;

		if ( isDisabled ) {
			return null;
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Button
							onClick={ onConvertToStatic }
							className="sidetrack-reusable-convert-controls"
						>
							{ __( 'Convert to Regular Blocks', 'blockshop-options' ) }
						</Button>
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select ) => {
		return {
			isDisabled: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackConvertReusableOptions' ),
		};
	} ),
	withDispatch( ( dispatch, { clientId } ) => {
		const { createNotice } = dispatch( 'core/notices' );
		const {
			__experimentalConvertBlockToStatic: convertBlockToStatic,
		} = dispatch( 'core/editor' );

		return {
			onConvertToStatic() {
				convertBlockToStatic( clientId );
				createNotice(
					'info',
					__( 'Reusable Block converted.', 'blockshop-options' ),
					{
						isDismissible: true,
						type: 'snackbar',
					}
				);
			},
		};
	} ),
	withSpokenMessages
)( ToolbarControls );
