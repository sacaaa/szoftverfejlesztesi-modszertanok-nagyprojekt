package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.Review;

import java.util.List;
import java.util.Optional;

public interface IReviewService {

    List<Review> getAllReviews();

    Optional<Review> getReviewById(Long id);

}
