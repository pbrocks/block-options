/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { RawHTML } = wp.element;
const { Modal } = wp.components;

export function AboutGutenbergEditor( { closeModal } ) {
	const { core, editor, plugin } = window.sidetrackInfo;
	return (
		<Modal
			title={ __( 'About Gutenberg Block Editor', 'blockshop-options' ) }
			shouldCloseOnClickOutside={ false }
			onRequestClose={ () => closeModal() }
			closeLabel={ __( 'Close', 'blockshop-options' ) }
			icon={ null }
			className="sidetrack-modal-component components-modal--sidetrack-overview"
		>
			<p>{ __( 'Version', 'blockshop-options' ) } <strong>{ editor.version }</strong></p>
			<p>{ editor.is_core ?
				sprintf( __( 'You are using the new block editor bundled on WordPress core %s', 'blockshop-options' ), core.version ) :
				<RawHTML>{ sprintf( __( 'You are using the new block editor powered by the %sGutenberg Plugin%s.', 'blockshop-options' ), '<a href="https://wordpress.org/plugins/gutenberg/" target="_blank" rel="noreferrer noopener nofollow">', '</a>' ) }</RawHTML>
			}</p>
			<p><RawHTML>{ sprintf( __( ' Want to help? %sGet involved or report an issue%s.', 'blockshop-options' ), '<a href="https://github.com/WordPress/gutenberg/issues" target="_blank" rel="noreferrer noopener nofollow">', '</a>' ) }</RawHTML></p>
			<p className="sidetrack-version-small">{ sprintf( __( 'Sidetrack %s', 'blockshop-options' ), plugin.version ) }</p>
		</Modal>
	);
}
