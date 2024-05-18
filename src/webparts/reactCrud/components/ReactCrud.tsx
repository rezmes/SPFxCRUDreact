import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { IReactCrudProps } from './IReactCrudProps';
import { IReactCrudState } from './IReactCrudState';
import {PnpServices} from '../Services/pnpservices'

import {
  TextField,
  Dropdown,
  IDropdownOption,
  IIconProps,
  PrimaryButton,
  DetailsList,
  CheckboxVisibility,
  DetailsListLayoutMode
} from 'office-ui-fabric-react';
import { LIST_COLUMNS } from '../shared/constants';

const AddICon: IIconProps = { iconName: 'Add' };
const ReadICon: IIconProps = { iconName: 'BulletedListText' };
const SaveICon: IIconProps = { iconName: 'Save' };
const DeleteICon: IIconProps = { iconName: 'Delete' };

const ddlBatchOptions: IDropdownOption[] = [
  { key: 'Batch 1', text: 'Batch 1' },
  { key: 'Batch 2', text: 'Batch 2' },
  { key: 'Batch 3', text: 'Batch 3' }
];

const ddlLevelOFKnowledgeOptions: IDropdownOption[] = [
  { key: 'Beginner', text: 'Beginner' },
  { key: 'Intermediate', text: 'Intermediate' },
  { key: 'Expert', text: 'Expert' }
];

export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState> {
  private _sp: PnpServices;
  private _selection: Selection
  constructor(props:IReactCrudProps, state: IReactCrudState){
    super(props);

    this.state={
      status: 'Ready',
      ListItems:[],
      ListItem:{
        Id:0,
        Title:'',
        Email:'',
        Batch:'',
        LevelOfKnowledge:''
      }

    };
    this._sp = new PnpServices(this.props.context);
    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ ListItem: this._onItemSelectionChanged() }),
    });
  }

private _onItemSelectionChanged():any{
  const selectedItem=this._selection.getSelection()[0] as IListItem;

  return selectedItem;
}

private async callAndBindDetailsList(message:string):Promise<any> {
  await this._sp.getItems(this.props.listName).then(listItems => {
    this.setState({
      ListItems: listItems,
      status:message,
    });
  });
}


private async _createItem() : Promise<any> {

  await this._sp.CreateItem(this.props.listName, this.state.ListItem)
  .then((Id) => {
    this.callAndBindDetailsList('New Item Created Successfully with ID' + Id
    );
  });
}


private async _readItem():Promise<any> {
  await this.callAndBindDetailsList('New Item Created Successfully ');
}

private async _updateItem(): Promise<any> {
  await this._sp.updateItem(this.props.listName, this.state.ListItem.Id, {
    Title: this.state.ListItem.Title,
    Email: this.state.ListItem.Email,
    Batch: this.state.ListItem.Batch,
    LevelOfKnowledge: this.state.ListItem.LevelOfKnowledge
  }).then((Id)=>{
    this.callAndBindDetailsList(`Item ${Id} Updated Successfully`);
  });
}

private async _deleteItem(): Promise<any> {
  try {
    await this._sp.deleteItem(this.props.listName, this.state.ListItem.Id)
    .then(() => {
      this.setState({status:'Item Deleted Successfully'});
    });
  } catch (error) {
    
  }
}


componentDidMount(): void {
    this.callAndBindDetailsList('Record Loaded')
}


  public render(): React.ReactElement<IReactCrudProps> {
    return (
      <div>
        <div className={styles.rootStack}>
          <div className={styles.columnStack}>
            <TextField label="Username" placeholder="Please enter username" />
            <TextField label="Email" placeholder="Please enter your email address" />
            <Dropdown
              label="Batch Number"
              options={ddlBatchOptions}
              className={styles.dropdownCustom}
            />
            <Dropdown
              label="Select Level Of Knowledge"
              options={ddlLevelOFKnowledgeOptions}
              className={styles.dropdownCustom}
            />
          </div>
        </div>

        <hr />
        <div className={styles.primaryButtonGroup}>
          <PrimaryButton text="Create" iconProps={AddICon} onClick={(e)=>this._createItem()} />
          <PrimaryButton text="Read" iconProps={ReadICon} onClick={(e)=>this._readItem()}/>
          <PrimaryButton text="Update" iconProps={SaveICon} onClick={(e)=>this._updateItem()}/>
          <PrimaryButton text="Delete" iconProps={DeleteICon} onClick={(e)=>this._deleteItem()}/>
        </div>
        <div id="divStatus"></div>
        <hr />
        <DetailsList
          items={this.state.ListItems}
          columns={LIST_COLUMNS}
          setKey="Id"
          checkboxVisibility={CheckboxVisibility.onHover}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          slelection = {this._selection}
        />
      </div>
    );
  }
}