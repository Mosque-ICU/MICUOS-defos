import React from 'react';
import { render } from 'ink';
import { Form } from 'ink-form';


//  This is set up so far to show the interface we should add the information and then run the actions in the scrpt using js to refrenmce the files print the ssttoud and then also accompany with the ink animations as a facarde 

const licenses = [
    'MIT',
    'CC-BY-SA-4.0',
    'CC-BY-ND-4.0',
    'CC-BY-NC-SA-4.0',
    'CC-BY-NC-ND-4.0',
    'CC-BY-NC-4.0',
    'CC-BY-4.0',
    'BSD-4-Clause-UC',
    'Apache-2.0',
    'W3C-20150513',
].map(value => ({ value }));

const mode = true;

const sections = [
    {
        title: 'Drive Configuration',
        description: 'Specify the paths and settings for your drives and partitions.',
        fields: [
            {
                type: 'text',
                name: 'drivePath',
                label: 'Drive Path',
                required: true,
                description: 'The path to the main drive where the operating system and data will be stored.',
            },
            {
                type: 'text',
                name: 'efiPartitionPath',
                label: 'EFI Partition Path',
                required: true,
                description: 'The path to the EFI partition which contains the bootloader and other critical boot files.',
            },
            {
                type: 'text',
                name: 'rootPartition',
                label: 'Root Partition',
                required: true,
                description: 'The path to the root partition where the root filesystem is mounted.',
            },
        ],
    },
    {
        title: 'System Information',
        description: 'Provide information about the system and user settings.',
        fields: [
            {
                type: 'text',
                name: 'hostname',
                label: 'Hostname',
                required: true,
                description: 'The hostname for the system, which is used to identify the machine on the network.',
            },
            {
                type: 'text',
                name: 'username',
                label: 'Username',
                required: true,
                description: 'The username for the primary user account on the system.',
            },
        ],
    },
];


class CommandLineFormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.sections = props.sections;
        this.form = (
            <>
                {mode && (
                    <Form
                        onSubmit={value => console.log(`Submitted: `, value)}
                        form={{
                            title: 'Edit your package.json file',
                            sections: this.sections
                        }}
                    />
                )}
            </>
        );
    }

    static addSection(sections, title, description, fields) {
        // Validate input
        if (typeof title !== 'string' || typeof description !== 'string' || !Array.isArray(fields)) {
            throw new Error('Invalid input. Ensure title and description are strings, and fields is an array.');
        }

        // Create the new section
        const newSection = {
            title,
            description,
            fields: fields.map(field => {
                if (typeof field === 'object' && field.type && field.name) {
                    return field;
                } else {
                    throw new Error('Invalid field format. Each field must be an object with type and name properties.');
                }
            }),
        };

        // Push the new section to the sections array
        sections.push(newSection);
    }

    render() {
        return this.form;
    }
}

// // Adding a new section
// CommandLineFormBuilder.addSection(sections, 'New Section', 'Description of the new section.', [
//     {
//         type: 'string',
//         name: 'new-field',
//         label: 'New Field',
//         description: 'Description of the new field.',
//     },
// ]);

// Render the form
render(
    <CommandLineFormBuilder sections={sections} />
);
