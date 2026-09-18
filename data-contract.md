# Data Contract

项目：apa-citation-generator
阶段：02-product
状态：DONE

## Source Types

MVP source type：`journal_article`

Future source types：

- `website`
- `book`
- `report`

## DOI Lookup Request

Endpoint：

```http
GET /api/doi?doi=<encoded-doi>
```

Frontend sends：

```json
{
  "doi": "10.1037/0003-066X.59.1.29"
}
```

Worker behavior：

- Normalize DOI.
- Validate rough DOI format.
- Call Crossref REST API with configured `mailto`.
- Cache successful lookups.
- Rate limit abusive repeated requests.
- Return normalized metadata to frontend.
- Do not log full user input beyond operational logs needed for abuse prevention.

## DOI Lookup Response

Success：

```json
{
  "ok": true,
  "source": "crossref",
  "sourceType": "journal_article",
  "metadata": {
    "doi": "10.1037/0003-066X.59.1.29",
    "title": "Article title",
    "authors": [
      {
        "given": "Jane",
        "family": "Smith"
      }
    ],
    "issuedYear": "2020",
    "containerTitle": "Journal Name",
    "volume": "12",
    "issue": "3",
    "page": "45-56",
    "url": "https://doi.org/10.1037/0003-066X.59.1.29"
  },
  "warnings": []
}
```

Partial success：

```json
{
  "ok": true,
  "source": "crossref",
  "sourceType": "journal_article",
  "metadata": {
    "doi": "10.0000/example",
    "title": "Article title",
    "authors": [],
    "issuedYear": "2020",
    "containerTitle": "Journal Name"
  },
  "warnings": ["missing_authors", "missing_pages"]
}
```

Failure：

```json
{
  "ok": false,
  "error": {
    "code": "doi_not_found",
    "message": "We could not find this DOI. You can still enter the article details manually."
  }
}
```

Error codes：

- `invalid_doi`
- `doi_not_found`
- `crossref_unavailable`
- `rate_limited`
- `unknown_error`

## Manual Form Model

```json
{
  "sourceType": "journal_article",
  "authors": [
    {
      "given": "Jane",
      "family": "Smith"
    }
  ],
  "year": "2020",
  "title": "Article title",
  "journal": "Journal Name",
  "volume": "12",
  "issue": "3",
  "pages": "45-56",
  "doi": "10.0000/example",
  "url": "https://example.com/article"
}
```

## Citation Output Model

```json
{
  "reference": "Smith, J. (2020). Article title. Journal Name, 12(3), 45-56. https://doi.org/10.0000/example",
  "inTextParenthetical": "(Smith, 2020)",
  "inTextNarrative": "Smith (2020)",
  "warnings": []
}
```

## Privacy Rules

- Do not upload PDF files.
- Do not store generated citations in a user account.
- Do not store bibliography history.
- Do not send article title/body to third-party AI services.
- Only DOI is sent to Crossref for lookup.

## Analytics Events

```json
{
  "event": "citation_generated",
  "sourceType": "journal_article",
  "method": "doi_lookup",
  "hasWarnings": true,
  "warningCodes": ["missing_pages"]
}
```

Approved event names：

- `citation_form_started`
- `doi_lookup_started`
- `doi_lookup_succeeded`
- `doi_lookup_failed`
- `citation_generate_clicked`
- `citation_generated`
- `citation_generation_failed`
- `citation_copied`
- `faq_opened`

[DONE]
