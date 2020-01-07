/**
 * Internal dependencies
 */
import ClearBlockFormatting from './components/controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-block-clear-formatting', {
	icon: 'editor-removeformatting',
	render: ClearBlockFormatting,
} );
