## Paging Controls Component

```jsx
<PagingControls 
  pageCount={pageCount} 
  currentPage={currentPage} 
  onSelectPage={onSelectPage} 
/>
```

The paging controls component works by providing the total number of pages as `pageCount`, the current page as `currentPage` and a callback for when a user interacts with the component to change a page with `onSelectPage`.

### Example use:

```jsx
class PagingContainer extends Component {
  static propTypes = {
    pageCount: number,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.onSelectPage = this.onSelectPage.bind(this);
  }

  onSelectPage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { pageCount } = this.props;
    const { currentPage } = this.state;
    return (
      <PagingControls
        pageCount={pageCount}
        currentPage={currentPage}
        onSelectPage={this.onSelectPage}
      />
    );
  }
}
```
