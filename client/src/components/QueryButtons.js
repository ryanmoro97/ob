import React from 'react';
import '../styles/QueryButtons.css';

import { querySearch } from '../queries/querySearch';
import { queryReset } from '../queries/queryReset';
import { queryUpdate } from '../queries/queryUpdate';
import { queryFillModels } from '../queries/queryFillModels';
import { queryAIMExport } from '../queries/queryAIMExport';
import { queryBCExport } from '../queries/queryBCExport';

function QueryButtons() {
    return (
      <div className="query-buttons-container">
        <button className="query-button" onClick={querySearch}>Search</button>
        <button className="query-button" onClick={queryReset}>Reset</button>
        <button className="query-button" onClick={queryUpdate}>Update</button>
        <button className="query-button" onClick={queryFillModels}>Fill Models</button>
        <button className="query-button" onClick={queryAIMExport}>AIM Export</button>
        <button className="query-button" onClick={queryBCExport}>BC Export</button>
      </div>
    );
  }

export default QueryButtons;

