import React, { PureComponent } from 'react';
import assignment from '../../public/images/assignment.gif';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { AddItem } from './AddItem';
import { Guid } from './Guid';

export class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: Guid(), text: 'Make a coffee' },
        { id: Guid(), text: 'Master React' },
        { id: Guid(), text: 'Learn Redux' },
        { id: Guid(), text: 'Help making Draft awesome' }
      ],
    };
  }

  handleAdd = (text) => {
    const newItem = { id: Guid(), text };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  handleSave = (id, text) => {
    const items = [...this.state.items];
    const index = items.map(it => it.id).indexOf(id);
    const item = { ...items[index] };
    item.text = text;
    items[index] = item;
    this.setState(() => ({ items }));
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
                { this.state.items.map((item, index) => (
                  <Item
                    key={item.id}
                    index={index}
                    id={item.id}
                    text={item.text}
                    onDelete={this.handleDelete}
                    onSave={this.handleSave}
                  />
                ))}
                <AddItem onAdd={this.handleAdd}></AddItem>
              </ul>
            </pre>
          </div>
      </div>
    );
  }
}
