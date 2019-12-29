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

export const toolTip = {
	name,
	title: __( 'Tooltip', 'block-options' ),
	tagName: 'ttp',
	className: 'tooltips',
	attributes: {
		style: 'style',
		class: 'class',
	},
	edit: Edit,
};
