import { IEchartsReactCoreProps, IEchartsReactCoreState } from './interface';
import { Component } from 'react';
declare class EchartsReactCore extends Component<IEchartsReactCoreProps, IEchartsReactCoreState> {
    echartsLib: any;
    echartsElement: HTMLDivElement | HTMLCanvasElement;
    constructor(props: IEchartsReactCoreProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getEchartsInstance: () => any;
    dispose: () => void;
    rerender: () => void;
    bindEvents: (instance: any, events: any) => void;
    renderEchartDom: () => any;
    render(): JSX.Element;
}
export default EchartsReactCore;
