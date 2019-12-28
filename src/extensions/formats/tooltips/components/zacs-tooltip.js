const {
	Button,
	Dashicon,
	Tooltip,
} = wp.components;

// Wrap the Tooltip component around whatever you want to activate the tooltip on hover
<Tooltip 
	text={ __( 'Add Tooltip Text Here' )  }
>
	<Button>
	    // Change icon to desired dashicon icon or replace component with SVG
	    <Dashicon icon="edit" />
    </Button>
</Tooltip>