import React from "react";
import LessonItem from "./LessonItem.js";

import {Table as TableBtr} from 'react-bootstrap';


class LessonTable extends React.Component {
    constructor(props) {
        super(props);
        this.colName = {
            id: " ",
            name: "Name",
            link: "Link / URL",
            controlls: " ",
        };
    }

    render() {
        let tableBody;
        if (this.props.dataList.length > 0) {
            tableBody = this.props.dataList.map(
                (element, index) => {
                    return (<LessonItem
                        key={element.id}
                        lesson={element}
                        index={index + 1}
                        refresh={this.props.refresh}
                    />);
                }
            );
        } else {
            tableBody = <tr><td> Nothing to show </td></tr>;
        }
            //todo add refresh button instead of <th>{this.colName.id}</th>
        return (
            <TableBtr striped bordered hover size={'sm'} responsive={'md'}>
                <thead>
                <tr>
                    <th>{this.colName.id}</th>
                    <th>{this.colName.name}</th>
                    <th>{this.colName.link}</th>
                    <th>{this.colName.controlls}</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </TableBtr>
        )
    }
}

export default LessonTable;