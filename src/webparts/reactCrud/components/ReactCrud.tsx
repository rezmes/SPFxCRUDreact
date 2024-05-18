import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { IReactCrudProps } from './IReactCrudProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  TextField,
  Dropdown,
  IDropdownOption,
  IIconProps,
  PrimaryButton,
  DetailsList,
  CheckboxVisibility,
  SelectionMode,
  DetailsListLayoutMode
} from "office-ui-fabric-react";


const stackTokens = {childrenGap:50}
const AddICon: IIconProps = {iconName: "Add" }
const ReadICon: IIconProps = {iconName: "BulletedListText" }
const SaveICon: IIconProps = {iconName: "Save" }
const DeleteICon: IIconProps = {iconName: "Delete" }

const stackStyles: Partial<IstackStyles> = {root:{width:650}}

const dropdownStyles: Partial<IDropdownStyles> = {dropdown:{width:300}}

const ddlBatchOptions : IDropdownOption[]=[
  {key: "Batch 1", text:"Batch 1"},
  {key: "Batch 2", text:"Batch 2"},
  {key: "Batch 3", text:"Batch 3"}
]

const ddlLevelOFKnowledgeOptions : IDropdownOption[]=[
  {key: "Beginner", text:"Beginner"},
  {key: "Intermediate", text:"Intermediate"},
  {key: "Expert", text:"Expert"}
]

const columnProps : Partial<IStackProps>= {
  tokens : {childrenGap:15},
  styles : {root: {width: 300}}
}


export default class ReactCrud extends React.Component < IReactCrudProps, {} > {
  public render(): React.ReactElement<IReactCrudProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;
    return(
      <div>
        <Stack horizontal tokens= {stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
            label= "Username" 
            placeholder='Please enter username'
            />
            <TextField
            label= "Email" 
            placeholder='Please enter your email address'
            />
            <Dropdown
            label= "BatchNumber" 
            options={ddlBatchOptions}
            styles = {dropdownStyles}
            />            

            <Dropdown
            label= "Select Level Of Knowledge" 
            options={ddlLevelOFKnowledgeOptions}
            styles = {dropdownStyles}
            />            

          </Stack>
        </Stack>

<hr />
<Stack horizontal tokens={stackTokens}>
  <PrimaryButton 
  text = 'Create'
  iconProps={AddICon}
   />
  <PrimaryButton 
  text = 'Read'
  iconProps={ReadICon}
   />
  <PrimaryButton 
  text = 'Update'
  iconProps={SaveICon}
   />   
  <PrimaryButton 
  text = 'Delete'
  iconProps={DeleteICon}
   />
  </Stack>
  <div id='divStatus'></div>
      </div>

  //     <div className = { styles.reactCrud } >
  // <div className={styles.container}>
  //   <div className={styles.row}>
  //     <div className={styles.column}>
  //       <span className={styles.title}>Welcome to SharePoint!</span>
  //       <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
  //       <p className={styles.description}>{escape(this.props.description)}</p>
  //       <a href='https://aka.ms/spfx' className={styles.button}>
  //         <span className={styles.label}>Learn more</span>
  //       </a>
  //     </div>
  //   </div>
  // </div>
  //     </div >
    );
  }
}
