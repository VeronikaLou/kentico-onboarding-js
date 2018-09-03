import '../types/sticky-footer.css';
import React from 'react';
import { List } from '../containers/List';

export const App = () => (
  <div>
    <div className="container">
      <section id="app-content">
        <List />
      </section>
    </div>
    <footer className="footer">
      <p>
        &copy; 2017 Kentico software, s.r.o
      </p>
    </footer>
  </div>
);

App.displayName = 'App';
