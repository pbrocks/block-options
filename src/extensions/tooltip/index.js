/**
 * Internal dependencies
 */
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'editorskit/tooltip';

export const tooltip = {
	name,
	title: __( 'Tooltip', 'block-options' ),
	tagName: 'span',
	className: 'tooltips',
	attributes: {
		style: 'style',
		title: 'This is the Tooltip content.',
	},
	edit: Edit,
};
