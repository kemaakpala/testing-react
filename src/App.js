import React from 'react';
import { isNGA } from './utils/check-if-NGA.js';
import IF from './tissue/IF.jsx';
import SelectFormField from './atom/select-form-field.jsx';
import PostCodeFormField  from './atom/post-code-form-field.jsx';
import DurationInputFormField from './atom/duration-input-form-field.jsx';
var ResidentialStatuses = require('../../refData').residentialStatus;
var RetrieveProductFeaturesAC = require('ui-platform').ActionCreators.RetrieveProductFeaturesAC;
var Variables = require('variables');

class App extends React.Component {
  state = {
    currentYear: new Date().getFullYear(),
    isAuth: false,
    currentAddress: null,
    currentAddressField: null,
    changeAddressTarget: "_blank"
  };

  onChangeHandler() {
    this.props._onChange();
  }

  render() {
    let  currentAddressField = (<PostCodeFormField
      isAuth={this.state.isAuth}
      label="Postcode"
      name="currentAddress"
      validationMessage={this.props.state.validationMessages.currentAddress}
      value={this.props.state.currentAddress}
      highlightFields={this.props.highlightFields}
      onChange={this.onChangeHandler}
      isPrePop={this.props.isPrePop}
    />);

    if (this.state.isAuth) {
      var param = RetrieveProductFeaturesAC.getQueryStringParams('domain');
      var isLocal = RetrieveProductFeaturesAC.getQueryStringParams('local');
      var getDomain = isLocal
        ? ''
        : (param
          ? param
          : Variables.base_url);
      var changeAddressHref = getDomain + Variables.changeAddress;
      var unstructuredAddress = this.state.currentAddress
        ? this.state.currentAddress.unstructuredAddress
        : ""
      var currentAddressDetails = Object
        .keys(unstructuredAddress)
        .map(function (item) {
          return <p>{this.props.state.currentAddress.unstructuredAddress[item]}</p>;
        }.bind(this));

      currentAddressField = <div>
        {currentAddressDetails}
        {isNGA() && <p>To change your address, log on to {Variables.brandwiseBankingText}
          on your desktop.
        </p>}
        {!this.props.state.isBranch && !isNGA() && <p>Changing address?
          <a
            href={changeAddressHref}
            target={this.state.changeAddressTarget}
            aria-label="Update your address now, click to open.">Find out what you need to do
          </a>
        </p>}
      </div>
    }

    return (
      <div className="bottom-border address-details">
        {currentAddressField}
        <DurationInputFormField
          label="When did you move here?"
          name="durationOfStay"
          order="descending"
          durationText="Time at this address"
          startYear="1965"
          endYear={this.state.currentYear}
          highlightFields={this.props.highlightFields}
          validationMessage={this.props.state.validationMessages.durationOfStay}
          value={this.props.state.durationOfStay}
          onChange={this.onChangeHandler}/>
        <SelectFormField
          label="Residential status"
          name="residentialStatus"
          placeholder="Please select"
          options={ResidentialStatuses}
          validationMessage={this.props.state.validationMessages.residentialStatus}
          highlightFields={this.props.highlightFields}
          value={this.props.state.residentialStatus}
          onChange={this.onChangeHandler}/>
        <IF
          condition={!!(this.props.state.durationOfStay && ((this.props.state.durationOfStay.duration.years == 3 && this.props.state.durationOfStay.duration.months == 0) || this.props.state.durationOfStay.duration.years < 3))}>
          <h2>Previous Address</h2>
          <p>You need to provide your previous address. This is because you&#39;ve lived
            at your current address for less than 3 years.</p>
          <PostCodeFormField
            isAuth={this.state.isAuth}
            label="Postcode"
            name="previousAddress"
            isPreviousAddress={true}
            validationMessage={this.props.state.validationMessages.previousAddress}
            highlightFields={this.props.highlightFields}
            value={this.props.state.previousAddress}
            onChange={this.onChangeHandler}
            isPrePop={this.props.isPrePop}/>
        </IF>
      </div>
    );
  }
}

export default App;
