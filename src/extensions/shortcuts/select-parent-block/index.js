/**
 * Internal dependencies
 */
import RegisterShortcut from './components/controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-shortcuts-select-parent', {
	icon: false,
	render: RegisterShortcut,
} );
