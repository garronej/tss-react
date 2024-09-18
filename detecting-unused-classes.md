# 🧹 Detecting unused classes

There is [an ESLint plugin](https://github.com/garronej/eslint-plugin-tss-unused-classes) that detects unused classes for makeStyles and the Modern API: &#x20;

{% embed url="https://user-images.githubusercontent.com/6702424/167232362-828171de-b64c-4e92-9d01-cd9542fd02b8.mp4" %}

## Usage

1. Add the dependency:

```
yarn add --dev eslint-plugin-tss-unused-classes
```

1. Enable it in you ESLint config

**Case 1**: You have installed ESLint manually:\
Edit your  `eslint.config.js` file:

<pre class="language-javascript" data-title="eslint.config.js"><code class="lang-javascript"><strong>import tssUnusedClasses from 'eslint-plugin-tss-unused-classes'
</strong>
export default tseslint.config(
  { ignores: ['dist'] },
  {
    plugins: {
      // ...
<strong>      'tss-unused-classes': tssUnusedClasses,
</strong>    },
    rules: {
      // ...
<strong>      'tss-unused-classes/unused-classes': 'warn',
</strong>    },
  },
)

</code></pre>

[Example project](https://github.com/InseeFrLab/onyxia-ui)

**Case 2**: You are (still) in a [`create-react-app`](https://create-react-app.dev/) project:\
Edit your `package.json`:

{% code title="package.json" %}
```json
{
  //...
  "eslintConfig": {
    "plugins": [
      //...
      "tss-unused-classes"
    ],
    "rules": {
      "tss-unused-classes/unused-classes": "warn"
    }
  },
  //...
}
```
{% endcode %}

[Example projet](https://github.com/InseeFrLab/onyxia-web)

### Disabling warnings

In case of false positive, disabling the warning:

* For a line: `// eslint-disable-next-line tss-unused-classes/unused-classes`
* For the entire file: `// eslint-disable-next-line tss-unused-classes/unused-classes`
