import styled from 'styled-components';

const PermissionModalStyle = styled.div`
  min-height: 250px;

  .tabs-content {
    div[role=tablist] {
      justify-content: space-evenly !important;
    }
  }

  .error-message {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      small {
        color: red;
      }
    }

  .give-permissions-actions {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    button {
      flex-basis: 48%;
    }
  }
`;

export default PermissionModalStyle;
