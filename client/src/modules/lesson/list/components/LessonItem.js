import React from "react";
import Button from "../../../common/Button"
import history from "../../../../route/history";

class LessonItem extends React.Component {
    constructor(props) {
        super(props);
        //todo refactor
        this.handleEdit = (event) =>{
            const recordID = this.extractRecordID(
                event.target.id ,
                event.target.className
            );
            // Redirecting to Edit form
            history.push("/lesson/edit/"+recordID)
        };
        //todo refactor
        this.handleDelete = (event) =>{
            const recordID = this.extractRecordID(
                event.target.id ,
                event.target.className
            );
            // Redirecting to Delete form
            history.push("/lesson/delete/"+recordID)
        };
        //todo refactor
        this.extractRecordID = (id , classname) => {
            return id.substr(
                classname.length + 16
            )
        }
    }

    render() {
        const lesson = this.props.singleLesson;
        return (
            <tr>
                <td className="datum" >
                    {this.props.index}
                </td>
                <td className="datum" >
                    {lesson.name}
                </td>
                <td className="datum" >
                    {lesson.link}
                </td>
                <td>
                    <Button
                        name={"edit"}
                        addToClass={"datum"}
                        recordID={lesson.id}
                        handleClick={this.handleEdit}
                    />
                    <Button
                        name={"delete"}
                        addToClass={"datum"}
                        recordID={lesson.id}
                        handleClick={this.handleDelete}
                    />
                </td>
            </tr>
        )
    }
}

export default LessonItem;