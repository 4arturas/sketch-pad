import {createSketchPad, SketchPad, SketchPadProps} from "./SketchPad";
import {Meta, StoryObj} from "@storybook/html";

const meta = {
    title: 'My Examples/SketchPad',
    tags: ['autodocs'],
    render: ( args: SketchPadProps ) => {
        const sketchPad:SketchPad = createSketchPad( args );
        const div = document.createElement('div');
        div.style.backgroundColor = 'red';
        div.style.border = '10px solid black';
        div.appendChild(sketchPad.canvas);
        return div;
    },
    argTypes: {
        width: { control: 'number' },
        backgroundColor: { control: 'text' }
    }
} satisfies  Meta<SketchPadProps>

export default meta;
type Story = StoryObj<SketchPadProps>;

export const Primary: Story = {
    args: {
        width: 400,
        height: 400,
        backgroundColor: 'white'
    }
}