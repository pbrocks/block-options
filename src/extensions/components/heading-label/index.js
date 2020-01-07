/**
 * Internal dependencies
 */
import HeadingLabel from './components/controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-heading-label', {
	icon: false,
	render: HeadingLabel,
} );
