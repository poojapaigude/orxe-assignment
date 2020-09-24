import { css } from 'lit-element';
export default css `:host{--timer-color: var(--neutral);--counter-label-font-family: var(--global-font-family);--counter-label-font-size: var(--cmp-txt--sb-fs);--selection-color: var(--secondary)}.label{font-size:var(--counter-label-font-size);font-family:var(--counter-label-font-family)}.head{border-bottom:1px solid;font-size:var(--counter-label-font-size);font-family:var(--counter-label-font-family);padding:10px}.placeholder{color:#b4b9bd}.container{overflow-y:auto;border-radius:5px;box-shadow:rgba(0,0,0,0.2) 0px 4px 8px 0px;transition:all 0.3s ease 0s;font-size:var(--counter-label-font-size);font-family:var(--counter-label-font-family);padding:10px}.container .list-item{height:30px;width:100%;display:inline-block;border-bottom:1px solid #e2e2e2;margin-top:8px}.dropdown:hover{background-color:#ddd}.container.open{max-height:350px;opacity:1}.container.closed{max-height:0;opacity:0}.checked{background-color:var(--selection-color);color:var(--timer-color)}`;