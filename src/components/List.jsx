import React, { PureComponent } from 'react';
import assignment from '../../public/images/assignment.gif';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { AddItem } from './AddItem';

export class List extends PureComponent {
  constructor() {
    super();
    this.state = {
      items: [
        { id: 1, text: 'Make a coffee' },
        { id: 2, text: 'Master React' },
        { id: 3, text: 'Learn Redux' }
      ],
    };
  }

  guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


  handleAdd = (text) => {
    const newItem = { id: this.guid(), text };
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

              <ul className="list-group">
                { this.state.items.map(item => (
                  <Item id={item.id} text={item.text} onDelete={this.handleDelete}/>
                ))}

                <AddItem onAdd={this.handleAdd}></AddItem>
              </ul>

            </pre>
          </div>
      </div>
    );
  }
}
