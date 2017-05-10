import * as React from 'react';
import { connect } from 'react-redux';

import * as d3 from 'd3';
import Faux from 'react-faux-dom';

import './ScatterSeriesChart.css';

export interface IScatterSeriesChartProps extends React.Props<any> {
    image: any;
    data: any;
    path: string;
    img: any;
}

export interface IExtraProps {
    id: any;
}

export class UnconnectedScatterSeriesChart extends React.Component<IScatterSeriesChartProps & IExtraProps, {}> {

    static mapStateToProps(state: any, myProps: IExtraProps) {
        return {
            id: myProps.id,
            image: state.imageChart.d3JSON.images[myProps.id],
            data: state.imageChart.d3JSON.images[myProps.id].objects,
            path: state.imageChart.d3JSON.images[myProps.id].name,
            img: new Image()
        };
    }

    static mapDispatchToProps() {
        return {};
    }

    constructor() {
        super();
    }

    render(): JSX.Element {
        const props = this.props;
        let jsx = <div />;

        const children: JSX.Element[] = [];

        const width = this.props.image.width;
        const height = this.props.image.height;

        const x = d3.scale.linear().range([0, width]);
        const y = d3.scale.linear().range([height, 0]);

        x.domain([0, this.props.image.width]);
        y.domain([this.props.image.width, 0]);

        const node = Faux.createElement('svg');
        const svg = d3.select(node);

        svg.attr('class', 'chartClass')
           .attr('key', 'svg_' + this.props.img.src);

        svg.append('image')
            .attr('xlink:href', this.props.img.src)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height);

        Object.keys(props.data).forEach((key: any) => {
            const data = props.data[key].bbox;
            const name = props.data[key].className;

            const g = svg.append('g')
                .attr('class', 'rectClass')
                .attr('width', width)
                .attr('height', height);

            if (data) {
                g.append('rect')
                    .datum(data)
                    .attr('class', 'bar')
                    .attr('x', (d) => {
                        return d[0];
                    })
                    .attr('y', (d) => {
                        return d[1];
                    })
                    .attr('width', (d) => {
                        return d[2];
                    })
                    .attr('height', (d) => {
                        return d[3];
                    });
                g.append('text')
                    .datum(data)
                    .attr('x', (d) => {
                        return d[0];
                    })
                    .attr('y', (d) => {
                        return d[1] - 5;
                    })
                    .attr('font-family', 'sans-serif')
                    .attr('font-size', '20px')
                    .attr('stroke-width', 1)
                    .text(name);
            }
            jsx = node.toReact();
            children.push(jsx);
        });

        return (
            <span>
                {jsx}
            </span>
        );
    }

    componentWillMount() {
        // this.props.img.src = this.props.path;
    }
}

export const ScatterSeriesChart = connect(UnconnectedScatterSeriesChart.mapStateToProps,
                                          UnconnectedScatterSeriesChart.mapDispatchToProps)
                                          (UnconnectedScatterSeriesChart);
