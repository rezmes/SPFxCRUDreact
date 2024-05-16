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

export default class ReactCrud extends React.Component < IReactCrudProps, {} > {
  public render(): React.ReactElement<IReactCrudProps> {
    return(
      <div className = { styles.reactCrud } >
  <div className={styles.container}>
    <div className={styles.row}>
      <div className={styles.column}>
        <span className={styles.title}>Welcome to SharePoint!</span>
        <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
        <p className={styles.description}>{escape(this.props.description)}</p>
        <a href='https://aka.ms/spfx' className={styles.button}>
          <span className={styles.label}>Learn more</span>
        </a>
      </div>
    </div>
  </div>
      </div >
    );
  }
}
