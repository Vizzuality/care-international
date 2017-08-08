import React from "react";
import PropTypes from "prop-types";

import AppLink from "components/elements/AppLink";
import AreaSummary from "components/elements/AreaSummary";
import RadioButton from "components/elements/Radio";
import BarWrapper from "components/wrappers/Bar";
import ValueBar from "components/elements/ValueBar";
import RhombusSVG from "components/svg/Rhombus";

import groupStories from "lib/groupStories";
import getLocation from "lib/location";
import programs from "resources/programs.json";


class ImpactSidebarArea extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    program: PropTypes.string,
    statistics: PropTypes.object.isRequired,
    stories: PropTypes.array,
    handleProgramChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    program: "overall",
  };

  render() {
    let {
      stories,
      program,
      statistics,
      handleProgramChange,
    } = this.props;

    let groupedStories = groupStories(stories);

    return (<div className="sidebar-content-impact">

      <AreaSummary
        title="Total Population impacted in 2016"
        value={statistics[`${program}_impact`]}
        program={program}
      />

      <div className="filters">
        <dl>
          <dt>
            Population impacted by program area
          </dt>
          <dd>
            <ul>
              {programs.map((p, n) => {

                let value = statistics[`${p.id}_impact`];
                let maxValue = statistics["overall_impact"];

                return (<li key={n} className={p.id}>
                  <RadioButton
                    id={`radio-${n}`}
                    name="program-filter"
                    checked={program === p.id}
                    onChange={() => handleProgramChange(p.id)}>
                    {p.label}
                  </RadioButton>
                  <ul>
                    <li>
                      <BarWrapper bar={ValueBar}
                        value={value}
                        maxValue={maxValue}
                        formatter={(v) => v.toLocaleString()}
                        colorClass={p.id} />
                    </li>
                  </ul>
                </li>);

              })}
            </ul>
          </dd>
        </dl>
      </div>

      <div className="stories">
        <dl>
          <dt>
            All impacts
            <hr />
          </dt>
          <dd>
            <ul>
              {groupedStories.map((story) => {
                return (<li key={story.story_number}>
                  <ul className="story">
                    <li className="title">
                      <AppLink mainView="impact" country={story.country[0]} story={story.story_number}>
                        {story.story}
                      </AppLink>
                    </li>
                    <li>
                      <ul className="outcomes">
                        {story.outcome.map((outcome) => (<li key={outcome}>
                          <RhombusSVG size={15} program={outcome} />
                          {outcome}
                        </li>))}
                      </ul>
                    </li>
                    <li>
                      <ul className="locations">
                        {story.country.map((country) => (<li key={country}>
                          <AppLink mainView="impact" country={country} story={story.story_number}>
                            {country}
                          </AppLink>
                        </li>))}
                      </ul>
                    </li>
                  </ul>
                </li>);
              })}
            </ul>
          </dd>
        </dl>
      </div>

    </div>);
  }

}


export default ImpactSidebarArea;
