import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { IReactCrudProps } from './IReactCrudProps';
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

export default class ReactCrud extends React.Component<IReactCrudProps, {}> {
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
          <PrimaryButton text="Create" iconProps={AddICon} />
          <PrimaryButton text="Read" iconProps={ReadICon} />
          <PrimaryButton text="Update" iconProps={SaveICon} />
          <PrimaryButton text="Delete" iconProps={DeleteICon} />
        </div>
        <div id="divStatus"></div>
        <hr />
        <DetailsList
          items={[
            {
              Id: '0',
              Title: 'Dummy Title',
              Email: 'dummy@abc.com',
              Batch: 'Batch 1',
              LevelOfKnowledge: 'LevelOfKnowledge'
            }
          ]}
          columns={LIST_COLUMNS}
          setKey="Id"
          checkboxVisibility={CheckboxVisibility.onHover}
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />
      </div>
    );
  }
}