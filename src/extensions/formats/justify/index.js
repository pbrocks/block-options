/**
 * Internal dependencies
 */
import JustifyControl from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'sidetrack/justify';

export const justify = {
	name,
	title: __( 'Align text justify', 'blockshop-options' ),
	tagName: 'p',
	className: null,
	attributes: {
		style: 'style',
	},
	edit( { isActive, value, onChange, activeAttributes } ) {
		return (
			<Fragment>
				<JustifyControl name={ name } isActive={ isActive } value={ value } onChange={ onChange } activeAttributes={ activeAttributes } />
			</Fragment>
		);
	},
};
