import React from 'react';


export const OptionChainHeaderCells = () => {
  return (
    <>
      <td>Last</td>
      <td>Bid</td>
      <td>Ask</td>
      <td>Mark</td>
      <td>Change</td>
      <td>%</td>
      <td>Delta</td>
      <td>Daily Loss</td>
      <td title={[
        'Time neutral underlying movement.',
        'A value of 2% means that the underlying needs to move ~2% to hedge against the loss due to theta.',
      ].join('\n')}>
        T= Move
      </td>
      <td>Spread</td>
    </>
  );
};
