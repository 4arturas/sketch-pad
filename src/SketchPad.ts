interface IPoint { x: number, y: number }
export interface SketchPadProps { width: number, height: number, backgroundColor: string }
export interface SketchPad { canvas: HTMLCanvasElement, paths: Array<Array<IPoint>>, isDrawing: boolean,width: number, height: number }
function getMouse( evt:MouseEvent, canvas:HTMLCanvasElement ) : IPoint
{
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return {
        x: Math.round( x ),
        y: Math.round( y )
    };
}

const path = (canvas: HTMLCanvasElement, path: Array<IPoint>, color = 'black') => {
    const ctx = canvas.getContext('2d');
    if ( !ctx ) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.moveTo( path[0].x, path[0].y );
    for ( let i = 0; i < path.length; i++ )
        ctx.lineTo( path[i].x, path[i].y );
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

const paths = (canvas: HTMLCanvasElement, lines: Array<Array<IPoint>>, color = 'black') => {
    for ( const line of lines )
        path( canvas, line, color );
}

function reset( pad: SketchPad ): void {
    pad.paths = [];
    pad.isDrawing = false;
    redraw( pad );
}
function redraw( pad: SketchPad ) : void {
    const ctx = pad.canvas.getContext('2d');
    if ( !ctx )
        return;
    ctx.clearRect( 0, 0, pad.width, pad.height);
    paths(pad.canvas, pad.paths);
}
export const createSketchPad = (props:SketchPadProps): SketchPad => {
    const canvas:HTMLCanvasElement = document.createElement('canvas');
    canvas.width = props.width;
    canvas.height = props.height;
    canvas.style.backgroundColor = props.backgroundColor;


    const pad: SketchPad =  {
        canvas: canvas,
        paths: [],
        isDrawing: false,
        width: props.width,
        height: props.height,
    };
    reset( pad );

    pad.canvas.onmousedown = ( evt ) => {
        const mouse:IPoint = getMouse( evt, pad.canvas );
        pad.paths.push([mouse]);
        pad.isDrawing = true;
    }

    pad.canvas.onmousemove = ( evt ) => {
        if ( !pad.isDrawing )
            return;

        const mouse = getMouse( evt, pad.canvas );
        const last = pad.paths[pad.paths.length-1];
        last.push(mouse);
        redraw( pad );
    }

    document.onmouseup = (evt) => {
        pad.isDrawing = false;
    }

    return pad;
}