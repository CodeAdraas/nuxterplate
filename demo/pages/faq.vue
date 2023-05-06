<template>
    <faq
        :title="[{
            type: 'heading2',
            text: 'Frequently asked questions',
            spans: []
        }]"
        :qas="[[
            [{
                type: 'heading4',
                text: 'What is a prime number?',
                spans: []
            }],
            [{
                type: 'paragraph',
                text: 'You tell me, mister',
                spans: []
            }]
        ],[
            [{
                type: 'heading4',
                text: 'Who was the first human in space?',
                spans: []
            }],
            [{
                type: 'paragraph',
                text: 'You tell me, mister',
                spans: []
            }]
        ]]"
        expand-icon="plus-circle"
    />
</template>