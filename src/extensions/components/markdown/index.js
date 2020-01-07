/**
 * Internal dependencies
 */
import MarkdownFormatting from './components/menu';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-markdown-formatting', {
	icon: false,
	render: MarkdownFormatting,
} );
