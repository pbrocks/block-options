/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import './api.js';

/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { dispatch, withSelect } = wp.data;
const { Fragment, Component } = wp.element;
const { SelectControl, TextareaControl } = wp.components;

class ACFOptions extends Component {
	render() {
		const {
			acf,
			selectedBlock,
		} = this.props;

		const {
			clientId,
			attributes,
			reloadModal,
		} = selectedBlock;

		const {
			sidetrack,
		} = attributes;

		const onSelectFields = ( key, value ) => {
			delete sidetrack[ key ];

			const blockOptions = Object.assign( { [ key ]: value }, sidetrack );

			dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { sidetrack: blockOptions } );

			if ( reloadModal ) {
				reloadModal();
			}
		};

		const acfFields = [ {
			label: __( 'Select Field', 'blockshop-options' ),
			value: '',
		} ];

		if ( ! acf ) {
			return;
		}

		if ( typeof acf !== 'undefined' ) {
			if ( ! isEmpty( acf ) ) {
				const acfFlds = acf;
				for ( const acfFld in acfFlds ) {
					acfFields.push( {
						label: acfFlds[ acfFld ],
						value: acfFld,
					} );
				}

				return (
					<Fragment>
						<div className="sidetrack-button-group-container sidetrack-button-group-acf">
							<label className="components-base-control__label" >{ __( 'Advanced Custom Fields', 'blockshop-options' ) }</label> { /* eslint-disable-line jsx-a11y/label-has-for */ }
							<SelectControl
								value={ ( typeof sidetrack.acf_visibility !== 'undefined' && sidetrack.acf_visibility !== '' ) ? sidetrack.acf_visibility : '' }
								options={ [
									{
										label: __( 'Select Visibility Option', 'blockshop-options' ),
										value: 'none',
									},
									{
										label: __( 'Hide when Condition\'s met', 'blockshop-options' ),
										value: 'hide',
									},
									{
										label: __( 'Show when Condition\'s met', 'blockshop-options' ),
										value: 'show',
									},
								] }
								onChange={ ( n ) => onSelectFields( 'acf_visibility', n ) }
							/>

							<SelectControl
								value={ ( typeof sidetrack.acf_field !== 'undefined' && sidetrack.acf_field !== '' ) ? sidetrack.acf_field : '' }
								options={ acfFields }
								onChange={ ( n ) => onSelectFields( 'acf_field', n ) }
							/>

							<SelectControl
								value={ ( typeof sidetrack.acf_condition !== 'undefined' && sidetrack.acf_condition !== '' ) ? sidetrack.acf_condition : '' }
								options={ [
									{
										label: __( 'Select Condition', 'blockshop-options' ),
										value: 'none',
									},
									{
										label: __( 'Is Equal to', 'blockshop-options' ),
										value: 'equal',
									},
									{
										label: __( 'Is Not Equal to', 'blockshop-options' ),
										value: 'not_equal',
									},
									{
										label: __( 'Contains', 'blockshop-options' ),
										value: 'contains',
									},
									{
										label: __( 'Does Not Contain', 'blockshop-options' ),
										value: 'not_contains',
									},
									{
										label: __( 'Is Empty', 'blockshop-options' ),
										value: 'empty',
									},
									{
										label: __( 'Is Not Empty', 'blockshop-options' ),
										value: 'not_empty',
									},
								] }
								onChange={ ( n ) => onSelectFields( 'acf_condition', n ) }
							/>

							<TextareaControl
								label={ __( 'Conditional Value', 'blockshop-options' ) }
								rows="3"
								value={ sidetrack.acf_value }
								onChange={ ( n ) => onSelectFields( 'acf_value', n ) }
								help={ __( 'Additional support for Advanced Custom Fields plugin. Will automatically show when you have the plugin installed and activated.', 'blockshop-options' ) }
							/>
						</div>
					</Fragment>
				);
			}
		}

		return null;
	}
}

export default withSelect( ( select ) => {
	return {
		acf: select( 'sidetrack/acf' ).receiveACFields(),
	};
} )( ACFOptions );
