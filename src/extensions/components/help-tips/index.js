/**
 * Internal dependencies
 */
import HelpControl from './components/controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-help-tips', {
	icon: false,
	render: HelpControl,
} );
