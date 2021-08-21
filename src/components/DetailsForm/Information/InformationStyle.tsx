import styled from 'styled-components';

const InformationStyle = styled.div`
  height: 100%;

  .edit-info-btn {
    height: 5%;
  }

  .divider {
    height: 2%;
  }

  .info-sec {
    height: 91%;
    overflow-y: auto;
  }

  .info-sec-nopermission{
    height: 98%;
    overflow-y: auto;
  }

  .header-tbl-cell {
    border-right: 1px solid rgba(224, 224, 224, 1);
    background-color: #f7f7f7;
    font-weight: bold;
    width: 25%;
  }

  .tbl-cell {
    width: 75%;
    text-align: center;
  }
`;

export default InformationStyle;
