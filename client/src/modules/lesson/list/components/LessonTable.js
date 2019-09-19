import React from "react";
import LessonItem from "./LessonItem.js";

// import './LessonTable.css'

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
            tableBody = <tr> <td> Nothing to show </td> </tr>;
        }

        return (
            <table>
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
            </table>
        )
    }
}

export default LessonTable;