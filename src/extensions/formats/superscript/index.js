/**
 * Internal dependencies
 */
import SuperscriptControl from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'sidetrack/superscript';

export const superscript = {
	name,
	title: __( 'Superscript', 'blockshop-options' ),
	tagName: 'sup',
	className: null,
	edit( { isActive, value, onChange, activeAttributes } ) {
		return (
			<Fragment>
				<SuperscriptControl name={ name } isActive={ isActive } value={ value } onChange={ onChange } activeAttributes={ activeAttributes } />
			</Fragment>
		);
	},
};
