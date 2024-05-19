import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { IReactCrudProps } from './IReactCrudProps';
import { IReactCrudState } from './IReactCrudState';
import { IListItems } from '../models/IListItems';
import { PnpServices } from '../Services/pnpservices';
import {
    TextField, Dropdown, IDropdownOption, IIconProps, PrimaryButton,
    DetailsList, Selection, CheckboxVisibility, DetailsListLayoutMode
} from 'office-ui-fabric-react';
import { LIST_COLUMNS } from '../shared/constants';

const AddIcon: IIconProps = { iconName: 'Add' };
const ReadIcon: IIconProps = { iconName: 'BulletedListText' };
const SaveIcon: IIconProps = { iconName: 'Save' };
const DeleteIcon: IIconProps = { iconName: 'Delete' };

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
    private _selection: Selection;

    constructor(props: IReactCrudProps) {
        super(props);
        this.state = {
            status: 'Ready',
            ListItems: [],
            ListItem: {
                Id: 0,
                Title: '',
                Email: '',
                Batch: '',
                LevelOfKnowledge: ''
            }
        };
        this._sp = new PnpServices(this.props.context);
        this._selection = new Selection({
            onSelectionChanged: () =>
                this.setState({ ListItem: this._onItemSelectionChanged() }),
        });
    }

    private _onItemSelectionChanged(): IListItems {
        const selectedItem = this._selection.getSelection()[0] as IListItems;
        return selectedItem || { Id: 0, Title: '', Email: '', Batch: '', LevelOfKnowledge: '' };
    }

    private async callAndBindDetailsList(message: string): Promise<void> {
        const listItems = await this._sp.getItems(this.props.listName);
        this.setState({
            ListItems: listItems,
            status: message,
        });
    }

    private async _createItem(): Promise<void> {
        const Id = await this._sp.CreateItem(this.props.listName, this.state.ListItem);
        this.callAndBindDetailsList('New Item Created Successfully with ID ' + Id);
    }

    private async _readItem(): Promise<void> {
        await this.callAndBindDetailsList('List Loaded');
    }

    private async _updateItem(): Promise<void> {
        const Id = await this._sp.updateItem(this.props.listName, this.state.ListItem.Id, {
            Title: this.state.ListItem.Title,
            Email: this.state.ListItem.Email,
            Batch: this.state.ListItem.Batch,
            LevelOfKnowledge: this.state.ListItem.LevelOfKnowledge
        });
        this.callAndBindDetailsList(`Item ${Id} Updated Successfully`);
    }

    private async _deleteItem(): Promise<void> {
        await this._sp.deleteItem(this.props.listName, this.state.ListItem.Id);
        this.setState({ status: 'Item Deleted Successfully' });
        this.callAndBindDetailsList('List Reloaded');
    }

    componentDidMount(): void {
        this.callAndBindDetailsList('Record Loaded');
    }

    private _onChangeTextField = (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
  ): void => {
      const target = event.currentTarget as HTMLInputElement;
      const name = target.getAttribute('data-name');
      this.setState(prevState => ({
          ListItem: { ...prevState.ListItem, [name]: newValue || '' }
      }));
  };
  
  private _onChangeDropdown = (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption
  ): void => {
      const target = event.currentTarget as HTMLDivElement;
      const name = target.getAttribute('data-name');
      this.setState(prevState => ({
          ListItem: { ...prevState.ListItem, [name]: option?.text || '' }
      }));
  };

    public render(): React.ReactElement<IReactCrudProps> {
        return (
            <div>
                <div className={styles.rootStack}>
                    <div className={styles.columnStack}>

                    <TextField
    label="Username"
    placeholder="Please enter username"
    value={this.state.ListItem.Title}
    data-name='Title'
    onChange={this._onChangeTextField}
/>

<TextField
    label="Email"
    placeholder="Please enter your email address"
    value={this.state.ListItem.Email}
    data-name='Email'
    onChange={this._onChangeTextField}
/>

<Dropdown
    label="Batch Number"
    options={ddlBatchOptions}
    className={styles.dropdownCustom}
    selectedKey={this.state.ListItem.Batch}
    defaultValue={this.state.ListItem.Batch}
    data-name='Batch'
    onChange={this._onChangeDropdown}
/>

<Dropdown
    label="Select Level Of Knowledge"
    options={ddlLevelOFKnowledgeOptions}
    className={styles.dropdownCustom}
    selectedKey={this.state.ListItem.LevelOfKnowledge}
    defaultValue={this.state.ListItem.LevelOfKnowledge}
    data-name='LevelOfKnowledge'
    onChange={this._onChangeDropdown}
/>
                    </div>
                </div>
                <div id='divStatus'>{this.state.status}</div>
                <hr />
                <div className={styles.primaryButtonGroup}>
                    <PrimaryButton text="Create" iconProps={AddIcon} onClick={() => this._createItem()} />
                    <PrimaryButton text="Read" iconProps={ReadIcon} onClick={() => this._readItem()} />
                    <PrimaryButton text="Update" iconProps={SaveIcon} onClick={() => this._updateItem()} />
                    <PrimaryButton text="Delete" iconProps={DeleteIcon} onClick={() => this._deleteItem()} />
                </div>
                <div id="divStatus"></div>
                <hr />
                <DetailsList
                    items={this.state.ListItems}
                    columns={LIST_COLUMNS}
                    setKey="Id"
                    checkboxVisibility={CheckboxVisibility.onHover}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selection={this._selection}
                />
            </div>
        );
    }
}






// import * as React from 'react';
// import styles from './ReactCrud.module.scss';
// import { IReactCrudProps } from './IReactCrudProps';
// import { IReactCrudState } from './IReactCrudState';
// import { IListItems } from '../models/IListItems';
// import { PnpServices } from '../services/pnpservices';
// import {
//   TextField,
//   Dropdown,
//   IDropdownOption,
//   IIconProps,
//   PrimaryButton,
//   DetailsList,
//   Selection,
//   CheckboxVisibility,
//   DetailsListLayoutMode
// } from 'office-ui-fabric-react';
// import { LIST_COLUMNS } from '../shared/constants';

// const AddICon: IIconProps = { iconName: 'Add' };
// const ReadICon: IIconProps = { iconName: 'BulletedListText' };
// const SaveICon: IIconProps = { iconName: 'Save' };
// const DeleteICon: IIconProps = { iconName: 'Delete' };





// const ddlBatchOptions: IDropdownOption[] = [
//   { key: 'Batch 1', text: 'Batch 1' },
//   { key: 'Batch 2', text: 'Batch 2' },
//   { key: 'Batch 3', text: 'Batch 3' }
// ];

// const ddlLevelOFKnowledgeOptions: IDropdownOption[] = [
//   { key: 'Beginner', text: 'Beginner' },
//   { key: 'Intermediate', text: 'Intermediate' },
//   { key: 'Expert', text: 'Expert' }
// ];

// export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState> {
//   private _sp: PnpServices;
//   private _selection: Selection;

//   constructor(props: IReactCrudProps, state: IReactCrudState) {
//     super(props);
//     this.state = {
//       status: 'Ready',
//       ListItems: [],
//       ListItem: {
//         Id: 0,
//         Title: '',
//         Email: '',
//         Batch: '',
//         LevelOfKnowledge: ''
//       }
//     };
//     this._sp = new PnpServices(this.props.context);
//     this._selection = new Selection({
//       onSelectionChanged: () => this.setState({ ListItem: this._onItemSelectionChanged() })
//     });
//   }

//   private _onItemSelectionChanged(): any {
//     const selectedItem = this._selection.getSelection()[0] as IListItems;
//     return selectedItem || { Id: 0, Title: '', Email: '', Batch: '', LevelOfKnowledge: '' };
//   }

//   private async callAndBindDetailsList(message: string): Promise<any> {
//     await this._sp.getItems(this.props.listName).then(listItems => {
//       this.setState({
//         ListItems: listItems,
//         status: message
//       });
//     });
//   }

//   private async _createItem(): Promise<any> {
//     await this._sp.CreateItem(this.props.listName, this.state.ListItem).then(Id => {
//       this.callAndBindDetailsList('New Item Created Successfully with ID ' + Id);
//     });
//   }

//   private async _readItem(): Promise<any> {
//     await this.callAndBindDetailsList('List Loaded');
//   }

//   private async _updateItem(): Promise<any> {
//     await this._sp
//       .updateItem(this.props.listName, this.state.ListItem.Id, {
//         Title: this.state.ListItem.Title,
//         Email: this.state.ListItem.Email,
//         Batch: this.state.ListItem.Batch,
//         LevelOfKnowledge: this.state.ListItem.LevelOfKnowledge
//       })
//       .then(Id => {
//         this.callAndBindDetailsList(`Item ${Id} Updated Successfully`);
//       });
//   }

//   private async _deleteItem(): Promise<any> {
//     try {
//       await this._sp.deleteItem(this.props.listName, this.state.ListItem.Id).then(() => {
//         this.setState({ status: 'Item Deleted Successfully' });
//         this.callAndBindDetailsList('List Reloaded');
//       });
//     } catch (error) {
//       this.setState({ status: 'Error deleting item' });
//     }
//   }

//   componentDidMount(): void {
//     this.callAndBindDetailsList('Records Loaded');
//   }

//   private _onChangeTextField = (
//     event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//     newValue?: string
// ): void => {
//     const target = event.currentTarget as HTMLInputElement;
//     const name = target.name;
//     this.setState(prevState => ({
//         ListItem: { ...prevState.ListItem, [name]: newValue || '' }
//     }));
// };

//   private _onChangeDropdown = (
//     event: React.FormEvent<HTMLDivElement>,
//     option: IDropdownOption | undefined
//   ): void => {
//     const target = event.currentTarget as HTMLDivElement;
//     const name = target.getAttribute('name');
//     this.setState(prevState => ({
//       ListItem: { ...prevState.ListItem, [name]: option?.text || '' }
//     }));
//   };

//   public render(): React.ReactElement<IReactCrudProps> {
//     return (
//       <div>
//         <div className={styles.rootStack}>
//           <div className={styles.columnStack}>
//             <TextField
//               label="Username"
//               placeholder="Please enter username"
//               value={this.state.ListItem.Title}
//               name="Title"
//               onChange={this._onChangeTextField}
//             />

//             <TextField
//               label="Email"
//               placeholder="Please enter your email address"
//               value={this.state.ListItem.Email}
//               name="Email"
//               onChange={this._onChangeTextField}
//             />

//             <Dropdown
//               label="Batch Number"
//               options={ddlBatchOptions}
//               className={styles.dropdownCustom}
//               selectedKey={this.state.ListItem.Batch}
//               name="Batch"
//               onChange={this._onChangeDropdown}
//             />
  
//             <Dropdown
//               label="Select Level Of Knowledge"
//               options={ddlLevelOFKnowledgeOptions}
//               className={styles.dropdownCustom}
//               selectedKey={this.state.ListItem.LevelOfKnowledge}
//               name="LevelOfKnowledge"
//               onChange={this._onChangeDropdown}
//             />
//           </div>
//         </div>
//         <div id="divStatus">{this.state.status}</div>
//         <hr />
//         <div className={styles.primaryButtonGroup}>
//           <PrimaryButton
//             text="Create"
//             iconProps={AddICon}
//             onClick={() => this._createItem()}
//           />
//           <PrimaryButton
//             text="Read"
//             iconProps={ReadICon}
//             onClick={() => this._readItem()}
//           />
//           <PrimaryButton
//             text="Update"
//             iconProps={SaveICon}
//             onClick={() => this._updateItem()}
//           />
//           <PrimaryButton
//             text="Delete"
//             iconProps={DeleteICon}
//             onClick={() => this._deleteItem()}
//           />
//         </div>
//         <div id="divStatus"></div>
//         <hr />
//         <DetailsList
//           items={this.state.ListItems}
//           columns={LIST_COLUMNS}
//           setKey="Id"
//           checkboxVisibility={CheckboxVisibility.onHover}
//           layoutMode={DetailsListLayoutMode.fixedColumns}
//           selection={this._selection}
//         />
//       </div>
//       );
//     }
//   }






// import * as React from 'react';
// import styles from './ReactCrud.module.scss';
// import { IReactCrudProps } from './IReactCrudProps';
// import { IReactCrudState } from './IReactCrudState';
// import { IListItems } from '../models/IListItems';
// import {PnpServices} from '../Services/pnpservices'

// import {
//   TextField,
//   Dropdown,
//   IDropdownOption,
//   IIconProps,
//   PrimaryButton,
//   DetailsList,
//   Selection,
//   CheckboxVisibility,
//   DetailsListLayoutMode
// } from 'office-ui-fabric-react';
// import { LIST_COLUMNS } from '../shared/constants';

// const AddICon: IIconProps = { iconName: 'Add' };
// const ReadICon: IIconProps = { iconName: 'BulletedListText' };
// const SaveICon: IIconProps = { iconName: 'Save' };
// const DeleteICon: IIconProps = { iconName: 'Delete' };

// const ddlBatchOptions: IDropdownOption[] = [
//   { key: 'Batch 1', text: 'Batch 1' },
//   { key: 'Batch 2', text: 'Batch 2' },
//   { key: 'Batch 3', text: 'Batch 3' }
// ];

// const ddlLevelOFKnowledgeOptions: IDropdownOption[] = [
//   { key: 'Beginner', text: 'Beginner' },
//   { key: 'Intermediate', text: 'Intermediate' },
//   { key: 'Expert', text: 'Expert' }
// ];

// export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState> {
//   private _sp: PnpServices;
//   private _selection: Selection

//   constructor(props:IReactCrudProps, state: IReactCrudState){
//     super(props);

//     this.state={
//       status: 'Ready',
//       ListItems:[],
//       ListItem:{
//         Id:0,
//         Title:'',
//         Email:'',
//         Batch:'',
//         LevelOfKnowledge:''
//       }

//     };
//     this._sp = new PnpServices(this.props.context);
//     this._selection = new Selection({
//       onSelectionChanged: () =>
//         this.setState({ ListItem: this._onItemSelectionChanged() }),
//     });
//   }

// private _onItemSelectionChanged():any{
//   const selectedItem=this._selection.getSelection()[0] as IListItems;

//   //we added this:  || {Id: 0, Title:'', Email:'',Batch:'',LevelOfKnowledge:''}
//   return selectedItem || {Id: 0, Title:'', Email:'',Batch:'',LevelOfKnowledge:''};
// }

// private async callAndBindDetailsList(message:string):Promise<any> {
//   await this._sp.getItems(this.props.listName).then(listItems => {
//     this.setState({
//       ListItems: listItems,
//       status:message,
//     });
//   });
// }


// private async _createItem() : Promise<any> {

//   await this._sp.CreateItem(this.props.listName, this.state.ListItem)
//   .then(Id => {
//     this.callAndBindDetailsList('New Item Created Successfully with ID' + Id
//     );
//   }
//   );
// }


// private async _readItem():Promise<any> {
//   await this.callAndBindDetailsList('List Loaded');
// }

// private async _updateItem(): Promise<any> {
//   await this._sp.updateItem(this.props.listName, this.state.ListItem.Id, {
//     Title: this.state.ListItem.Title,
//     Email: this.state.ListItem.Email,
//     Batch: this.state.ListItem.Batch,
//     LevelOfKnowledge: this.state.ListItem.LevelOfKnowledge
//   }).then((Id)=>{
//     this.callAndBindDetailsList(`Item ${Id} Updated Successfully`);
//   });
// }

// private async _deleteItem(): Promise<any> {
//   try {
//     await this._sp.deleteItem(this.props.listName, this.state.ListItem.Id)
//     .then(() => {
//       this.setState({status:'Item Deleted Successfully'});
//       this.callAndBindDetailsList('List Reloaded')});
//   } catch (error) {
//     this.setState({ status: 'Error deleting item' });
//   }
// }


// componentDidMount(): void {
//     this.callAndBindDetailsList('Record Loaded')
// }


// //////////////////////////
// //Because of v1.4.1 limits

// private _onChangeTextField = (
//   event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//   newValue: string | undefined
// ): void => {
//   const { name } = event.currentTarget;
//   this.setState(prevState => ({
//     ListItem: { ...prevState.ListItem, [name]: newValue || '' }
//   }));
// };

// private _onChangeDropdown = (
//   event: React.FormEvent<HTMLDivElement>,
//   option: IDropdownOption | undefined
// ): void => {
//   const { name } = event.currentTarget;
//   this.setState(prevState => ({
//     ListItem: { ...prevState.ListItem, [name]: option?.text || '' }
//   }));
// };

// //Because of v1.4.1 limits
// //////////////////////////




//   public render(): React.ReactElement<IReactCrudProps> {
//     return (
//       <div>
//         <div className={styles.rootStack}>
//           <div className={styles.columnStack}>
//             <TextField label="Username" placeholder="Please enter username"
//             value={this.state.ListItem.Title}
//             name='Title'
//             onChange={this._onChangeTextField}
//             />
//             <TextField label="Email" placeholder="Please enter your email address" 
//                         value={this.state.ListItem.Email} 
//                         name='Email'
//                         onChange={this._onChangeTextField}
//             />
//             <Dropdown
//               label="Batch Number"
//               options={ddlBatchOptions}
//               className={styles.dropdownCustom}
//               selectedKey={this.state.ListItem.Batch}
//               defaultValue={this.state.ListItem.Batch}
//               value={this.state.ListItem.Title} 
//               name='Batch'
//               onChange={this._onChangeDropdown}

//             />
//             <Dropdown
//               label="Select Level Of Knowledge"
//               options={ddlLevelOFKnowledgeOptions}
//               className={styles.dropdownCustom}
//               selectedKey={this.state.ListItem.LevelOfKnowledge}
//               defaultValue={this.state.ListItem.LevelOfKnowledge}
//               value={this.state.ListItem.Title} 
//               onChange={this._onChangeDropdown}              
//             />
//           </div>
//         </div>

//               <div id='divStatus'>{this.state.status}</div>

//         <hr />
//         <div className={styles.primaryButtonGroup}>
//           <PrimaryButton text="Create" iconProps={AddICon} onClick={(e)=>this._createItem()} />
//           <PrimaryButton text="Read" iconProps={ReadICon} onClick={(e)=>this._readItem()}/>
//           <PrimaryButton text="Update" iconProps={SaveICon} onClick={(e)=>this._updateItem()}/>
//           <PrimaryButton text="Delete" iconProps={DeleteICon} onClick={(e)=>this._deleteItem()}/>
//         </div>
//         <div id="divStatus"></div>
//         <hr />
//         <DetailsList
//           items={this.state.ListItems}
//           columns={LIST_COLUMNS}
//           setKey="Id"
//           checkboxVisibility={CheckboxVisibility.onHover}
//           layoutMode={DetailsListLayoutMode.fixedColumns}
//           selection = {this._selection}
//         />
//       </div>
//     );
//   }
// }