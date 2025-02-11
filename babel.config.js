const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [require('react-hot-loader/babel')];

const productionPlugins = [
    require('babel-plugin-dev-expression'),
  
    // babel-preset-react-optimize
    require('@babel/plugin-transform-react-constant-elements'),
    require('@babel/plugin-transform-react-inline-elements'),
    require('babel-plugin-transform-react-remove-prop-types')
  ];

module.exports = api => {
    // see docs about api at https://babeljs.io/docs/en/config-files#apicache

    const development = api.env(developmentEnvironments);

    return {
       presets: [
            require('@babel/preset-env'),
            require('@babel/preset-typescript'),
            [require('@babel/preset-react'), { development }]
        ],
        plugins: [
            require('@babel/plugin-transform-runtime'),
            require('@babel/plugin-proposal-class-properties'),

            ...(development ? developmentPlugins : productionPlugins)
        ] 
    }
}