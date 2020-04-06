import React from "react";
import PropTypes from "prop-types";

import ModalBox from "components/elements/ModalBox";
import AboutModalContent from "components/content/AboutModal";
import ShareModalContent from "components/content/ShareModal";
import GenericModalContent from "components/content/GenericModal";
import ReachLegendContent from "components/content/ReachLegend";
import ImpactLegendContent from "components/content/ImpactLegend";

class ModalArea extends React.Component {

  static propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
    modal: PropTypes.string,
    texts: PropTypes.object.isRequired,
    subView: PropTypes.string,
    program: PropTypes.string,
  };

  static defaultProps = {
    program: "overall",
  };

  render() {
    const {
      handleToggleModal,
      modal,
      texts,
      subView,
      program,
     } = this.props;

    let modals = [
      {
        id: "about",
        component: AboutModalContent,
        props: {
          handleClose: () => handleToggleModal(null),
        },
      },
      {
        id: "share",
        component: ShareModalContent,
      },
      {
        id: "reachLegend",
        component: ReachLegendContent,
        props: {
          subView: subView,
          program: program,
          handleAboutClick: () => handleToggleModal("aboutReach"),
        },
      },
      {
        id: "impactLegend",
        component: ImpactLegendContent,
        props: {
          handleAboutClick: () => handleToggleModal("aboutImpact"),
        },
      },
      {
        id: "aboutReach",
        component: GenericModalContent,
        props: {
          title: "About Reach Data",
          text: texts.reach_data && texts.reach_data.message,
        },
      },
      {
        id: "aboutImpact",
        component: GenericModalContent,
        props: {
          title: "About Impact Data",
          text: texts.impact_data && texts.impact_data.message,
        },
      },
      {
        id: "aboutDirectReach",
        component: GenericModalContent,
        props: {
          title: "About Direct Reach",
          text: texts.direct && texts.direct.message,
        },
      },
      {
        id: "aboutIndirectReach",
        component: GenericModalContent,
        props: {
          title: "About Indirect Reach",
          text: texts.indirect && texts.indirect.message,
        },
      },
    ];

    let modalContent = modals.find((content) => content.id === modal) || null;

    return modalContent && (<ModalBox
      id={modalContent.id}
      handleClose={() => handleToggleModal(null)}
      {...modalContent.props}
    >
      <modalContent.component {...modalContent.props} />
    </ModalBox>);
  }
}

export default ModalArea;
