import {
  getTextsSQL,
  getYearsSQL,
  getLastYearSQL,
  getIntroMessageSQL,
  getReachStatisticsCountriesSQL,
  getReachStatisticsRegionsSQL,
  getImpactStatisticsSQL,
  getImpactRegionDataSQL,
  getImpactStoriesSQL,
  getImpactStoriesByCountrySQL,
  getBoundsSQL,
} from "lib/queries";
import config from "config.json";

// eslint-disable-next-line
const cartoSQL = window.cartodb.SQL({
  user: config.cartodb.account,
  sql_api_template: "https://{user}.carto.com",
});

const getBounds = (table, region, country) => {
  return new window.Promise((resolve, reject) => {
    cartoSQL.getBounds(getBoundsSQL(table, region, country))
      .done((result) => resolve(result))
      .error((error) => reject(error));
  });
};

const getLastYear = () => new window.Promise((resolve, reject) => {
  cartoSQL.execute(getLastYearSQL())
    .done((result) => resolve(result.rows[0].max))
    .error((error) => reject(error));
});

const getYears = () =>  new window.Promise((resolve, reject) => {
  cartoSQL.execute(getYearsSQL())
    .done((result) => resolve(result.rows.map(res => res.year)))
    .error((error) => reject(error));
});

const getIntroMessage = (year) => new window.Promise((resolve, reject) => {
  cartoSQL.execute(getIntroMessageSQL(year))
    .done((result) => resolve(result.rows[0].message))
    .error((error) => reject(error));
});

const getStoriesFiltered = (stories, program) => stories
  .filter(story => story.outcomes
  .filter(outcome => outcome === program || program === "overall" ).length > 0)
  .sort((a, b) => (a.countries > b.countries) ? 1 : -1);


const fetchGlobalData = (year) => {
  let getTexts = new window.Promise((resolve, reject) => {
    cartoSQL.execute(getTextsSQL())
      .done((result) => {
        let indexed = result.rows.reduce((accumulator, value) => {
          accumulator[value.about] = value;
          return accumulator;
        }, {});
        resolve(indexed);
      })
      .error((error) => reject(error));
  });

  let getStories = new window.Promise((resolve, reject) => {
    cartoSQL.execute(getImpactStoriesSQL(year))
      .done((result) => resolve(result.rows))
      .error((error) => reject(error));
  });

  let getStoriesByCountry = new window.Promise((resolve, reject) => {
    cartoSQL.execute(getImpactStoriesByCountrySQL())
      .done((result) => resolve(result.rows))
      .error((error) => reject(error));
  });

  return window.Promise.all([
    getTexts,
    getStories,
    getStoriesByCountry,
  ]);
};

const fetchReachData = (region, country, year) => {

  let sql = region ?
    getReachStatisticsRegionsSQL(region, year) :
    getReachStatisticsCountriesSQL(country, year);

  let getStatistics = new window.Promise((resolve, reject) => {
    cartoSQL.execute(sql)
      .done((result) => resolve(result.rows[0]))
      .error((error) => reject(error));
  });

  return window.Promise.all([
    getStatistics,
    (region || country) && getBounds(`reach_data${year}`, region, country),
  ]);
};

const fetchImpactData = (region, country, year) => {
  let getStatistics = new window.Promise((resolve, reject) => {
    cartoSQL.execute(getImpactStatisticsSQL(region, country))
      .done((result) => resolve(result.rows[0]))
      .error((error) => reject(error));
  });

  let getRegionData = new window.Promise((resolve, reject) => {
    cartoSQL.execute(getImpactRegionDataSQL(region))
      .done((result) => resolve(result.rows))
      .error((error) => reject(error));
  });

  return window.Promise.all([
    getStatistics,
    getRegionData,
    (region || country) && getBounds(`impact_data${year}`, region, country),
  ]);

};

export {
  fetchGlobalData,
  fetchReachData,
  fetchImpactData,
  getLastYear,
  getYears,
  getIntroMessage,
  getStoriesFiltered,
};
