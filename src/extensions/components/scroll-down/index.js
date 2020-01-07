/**
 * Internal dependencies
 */
import ScrollDown from './components/scrolldown';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-scrolldown', {
	icon: false,
	render: ScrollDown,
} );
