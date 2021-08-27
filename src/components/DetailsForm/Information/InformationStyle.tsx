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
    height: 100%;

    form {
      height: 91%;
      overflow-y: auto;
    }
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


  .form-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 5px 0 5px 0;

    .form-row-chl {
      flex-basis: 30%;
    }

    /* Custom, iPhone Retina */ 
    @media (max-width:480px){
      flex-direction: column;
      .form-row-chl {
        margin: 5px 0 5px 0;
      }
    }
  }

  .sec {
    margin: 20px 0 20px 0;
    textarea {
      width: 100%;
    }
  }

  .notes {
    flex-direction: column;
  }

  .form-actions {
    display: flex;
    justify-content: space-evenly;

    .edit-info-btn {
      flex: 0 1 49%;
    }
  }
`;

export default InformationStyle;
