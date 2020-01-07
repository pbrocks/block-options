/**
 * Internal dependencies
 */
import DisableTitle from './controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'sidetrack-disable-title', {
	icon: false,
	render: DisableTitle,
} );
