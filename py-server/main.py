
# from fastapi import FastAPI
# from fastapi.responses import JSONResponse
# import firebase_admin
# from firebase_admin import firestore
# from firebase_admin import db
# import numpy as np
# from sklearn.feature_extraction.text import CountVectorizer

# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.neighbors import NearestNeighbors


# from firebase_admin import credentials

# cred = credentials.Certificate("./firebase-service.json")
# firebase_admin.initialize_app(cred)


# app = FastAPI()
# db = firestore.client()



# @app.get('/contentjobs')
# async def content_jobs():
#     job_docs = db.collection('jobs').stream()
#     job_data = {}
#     for doc in job_docs:
#         job_data[doc.id] = doc.to_dict()

#     # extract job features
#     job_features = []
#     for data in job_data.items():
#         features = []
#         features.append(data['title'])
#         features.append(data['description'])
#         features.append(data['type'])
#         features.append(data['address'])
#         features.append(data['salary'])
#         job_features.append(' '.join(features))

#         # generate feature vectors for jobs
#         vectorizer = CountVectorizer(stop_words='english')
#         job_features_vec = vectorizer.fit_transform(job_features).toarray()

#         # compute similarity matrix
#         job_similarities = cosine_similarity(job_features_vec)

#         # function to get top n similar jobs for a given job
#         JOB_ID = 'NIqPhFPJBNpSciDzn5Wc'
#         job_index = list(job_data.keys()).index(JOB_ID)
#         similarities = job_similarities[job_index]
#         similar_indices = np.argsort(-similarities)[1:n+1]
#         similar_jobs = []
#         for idx in similar_indices:
#             job_id = list(job_data.keys())[idx]
#             similar_jobs.append(job_data[job_id])
#         return similar_jobs      

# @app.get('/recommendedjobs')
# async def recommended_jobs():
   
#     USER_ID = "Tv2hexObGwfRVUpikmlh4DwgGe62"
#     NUM_RECOMMENDATIONS = 1

#     # Load the job and interaction tables

#     jobs_ref = db.collection('jobs')
#     jobs_data = jobs_ref.stream()
#     jobs = pd.DataFrame([job.to_dict() for job in jobs_data])
#     jobs.set_index('id', inplace=True)

#     interactions_ref = db.collection('interactions')
#     interactions_data = interactions_ref.stream()
#     interactions = pd.DataFrame([interaction.to_dict() for interaction in interactions_data])

#     # Content-Based Filtering

#     # Preprocessing
#     # Preprocessing

#     jobs['description'] = jobs['description'].fillna('')
#     jobs['keywords'] = jobs['keywords'].fillna('')
#     jobs['address'] = jobs['address'].fillna('')
#     jobs['type'] = jobs['type'].fillna('')

    
#     # Feature Extraction
#     tfidf = TfidfVectorizer(stop_words='english')
#     job_vectors = tfidf.fit_transform(jobs['description'] + ' ' + jobs['keywords'] + ' ' + jobs['address'] + ' ' + jobs['type'])

#     # User Profile Creation

#     # User Profile Creation

#     user_interactions = interactions[interactions['user_id'] == USER_ID]
#     job_vectors = pd.DataFrame(job_vectors)
#     user_job_vectors = job_vectors.loc[user_interactions['job_id'].tolist()]



#     user_profile = user_job_vectors.mean(axis=0)

#     print(user_profile)

#     # Similarity Calculation
#     similarity_scores = cosine_similarity(user_profile, job_vectors)

#     # Recommendation Generation
#     similar_jobs_indices = similarity_scores.argsort()[0][::-1][:NUM_RECOMMENDATIONS]
#     recommended_jobs = jobs.iloc[similar_jobs_indices]['title'].tolist()

#     print(recommended_jobs)

#     return recommended_jobs



# @app.get('/jobs')
# async def jobs():
#     jobs_ref = db.collection('jobs')
#     docs = jobs_ref.get()
#     jobs = []
#     for doc in docs:
#         jobs.append({'id': doc.id, 'data': doc.to_dict()})

#     # Return the list of jobs as a JSON response
#     return JSONResponse(content=jobs)

# @app.get("/hello")
# async def hello():
#     return {"message": "Hello, Worlds!"}



# # # Collaborative Filtering

# # # User-Item Matrix Creation
# # user_item_matrix = interactions.pivot(index='user_id', columns='job_id', values='interaction').fillna(0)

# # # Similarity Calculation
# # user_similarity_scores = cosine_similarity(user_item_matrix)

# # # User Similarity Computation
# # user_similarity = pd.DataFrame(user_similarity_scores, index=user_item_matrix.index, columns=user_item_matrix.index)
# # user_similarity.drop(USER_ID, inplace=True)

# # # Neighborhood Selection
# # similar_users = user_similarity[USER_ID].sort_values(ascending=False)[:NEIGHBORHOOD_SIZE].index.tolist()

# # # Recommendation Generation
# # neighborhood_jobs = interactions[interactions['user_id'].isin(similar_users)]
# # neighborhood_jobs = neighborhood_jobs[~neighborhood_jobs['job_id'].isin(user_interactions['job_id'])]
# # recommended_jobs = neighborhood_jobs.groupby('job_id')['interaction'].sum().sort_values(ascending=False)[:NUM_RECOMMENDATIONS].index.tolist()



from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans

# Initialize FastAPI app
app = FastAPI()

# Initialize Firebase
cred = credentials.Certificate("./firebase-service.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Retrieve data from Firebase
job_ref = db.collection('jobs')
job_docs = job_ref.stream()
job_data = []
for job in job_docs:
    job_dict = job.to_dict()
    job_dict['id'] = job.id
    job_data.append(job_dict)

interaction_ref = db.collection('interactions')
interaction_docs = interaction_ref.stream()
interaction_data = []
for interaction in interaction_docs:
    interaction_dict = interaction.to_dict()
    interaction_data.append(interaction_dict)

# Preprocess data
job_df = pd.DataFrame(job_data)
# job_df = job_df.drop(columns=['id']) # Remove id column
job_df = job_df.fillna('') # Replace missing values with empty strings

# Compute TF-IDF vectors for job descriptions
tfidf = TfidfVectorizer(stop_words='english')
job_tfidf =  tfidf.fit_transform(job_df['description'] + ' ' + job_df['keywords'] + ' ' + job_df['address'] + ' ' + job_df['type'])

# Compute cosine similarity matrix
cos_sim = cosine_similarity(job_tfidf)

print(job_df)
# Recommend similar jobs (content based filtering based on job_id)
# similar jobs like the given one
@app.get("/jobs/{job_id}/recommendations")
async def get_recommendations(job_id: str):
    # Find index of job in DataFrame
    job_index = job_df[job_df['id']==job_id].index[0]
    print(job_index)
    # Compute cosine similarity scores
    sim_scores = list(enumerate(cos_sim[job_index]))

    # Sort scores in descending order
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Select top 10 most similar jobs
    top_jobs = sim_scores[1:11]

    similar_jobs = []
    for job in top_jobs:
        similar_job = job_df.iloc[job[0]].to_dict()
        similar_job['score'] = job[1]
        similar_jobs.append(similar_job)

    # Retrieve job titles from DataFrame


    return {'job_id': job_id, 'recommendations': similar_jobs}



# Recommend based on colloborative filtering
@app.get("/jobs/${user_id}/suggestions")
async def get_recommendations(user_id: str):
   # Load the dataset from a Pandas DataFrame
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(ratings_df[['user_id', 'job_id', 'rating']], reader)

    # Build the collaborative filtering model
    sim_options = {'name': 'cosine', 'user_based': True}
    model = KNNWithMeans(sim_options=sim_options)
    model.fit(data.build_full_trainset())

    # Get the inner id of the target user
    user_inner_id = model.trainset.to_inner_uid(user_id)

    # Get the top-K recommended jobs for the target user
    k = 10
    user_recs = model.get_top_n(user_inner_id, k=k)

    # Get the job IDs of the recommended jobs
    recommended_jobs = [job_id for job_id, _ in user_recs]

    return {'user_id': user_id, 'recommendations': recommended_jobs}


