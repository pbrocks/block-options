/**
 * Internal dependencies
 */
import UppercaseControl from './controls'; // eslint-disable-line no-unused-vars

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element; // eslint-disable-line no-unused-vars

/**
 * Block constants
 */
const name = 'sidetrack/uppercase';

export const uppercase = {
	name,
	title: __( 'Uppercase', 'blockshop-options' ),
	tagName: 'span',
	className: 'uppercase',
	edit( { isActive, value, onChange, activeAttributes } ) {
		return (
			<Fragment>
				<UppercaseControl name={ name } isActive={ isActive } value={ value } onChange={ onChange } activeAttributes={ activeAttributes } />
			</Fragment>
		);
	},
};
