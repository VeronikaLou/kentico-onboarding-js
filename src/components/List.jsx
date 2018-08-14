import React, { PureComponent } from 'react';
import assignment from '../../public/images/assignment.gif';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { AddItem } from './AddItem';
// import { Item } from './Item';

export class List extends PureComponent {
  constructor() {
    super();
    this.state = {
      items: [
        { id: 1, text: 'Make a coffee' },
        { id: 2, text: 'Master React' },
        { id: 3, text: 'Learn Redux' }
      ],
      //value: ""
    };
  }


  handleAdd = (text) => {
    const newItem = { id: 6, text };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  handleDelete = (id) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
  }

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">
              Desired functionality is captured in the gif image.
            </p>
            <p className="lead text-center">
              <b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item like <code>dateCreated</code>).
            </p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

         <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" invisible />
          </div>
         </div>

          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              TODO: implement the list here :)


              <div>
                { this.state.items.map(item => (
                  <Item id={item.id} text={item.text} onDelete={this.handleDelete}/>
                ))}

                <AddItem onAdd={this.handleAdd}></AddItem>
              </div>

            </pre>
          </div>
      </div>
    );
  }
}
