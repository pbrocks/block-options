/**
 * Internal dependencies
 */
import SubscriptControl from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Block constants
 */
const name = 'sidetrack/subscript';

export const subscript = {
	name,
	title: __( 'Subscript', 'blockshop-options' ),
	tagName: 'sub',
	className: null,
	edit( { isActive, value, onChange, activeAttributes } ) {
		return (
			<Fragment>
				<SubscriptControl name={ name } isActive={ isActive } value={ value } onChange={ onChange } activeAttributes={ activeAttributes } />
			</Fragment>
		);
	},
};
